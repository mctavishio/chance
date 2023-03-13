module.exports = function( blueprint ) {
	
	var width = blueprint.width < 20 ? 72*11 : blueprint.width; // 72 pdf units per inch
	var height = blueprint.height < 20 ? 72*8.5 : blueprint.height;
	var min = Math.min(width, height);
	var max = Math.max(width, height);

	blueprint.tools.logmsg("palette building ::: " + JSON.stringify(palette));
	var sketches = blueprint.sketchsets[blueprint.sketchset];
	var sketch = blueprint.sketch !== "all" ? blueprint.tools.mod(parseInt(blueprint.sketch), sketches.length) : blueprint.tools.randominteger(0, sketches.length);

	var palette = {};
	if(blueprint.rootcolors.indexOf("bw") >= 0) {
		palette.colorsets = [ ["#fcfbe3", "#000000"], ["#fcfbe3", "#000000", "#fcfbe3", "#000000"], ["#fcfbe3", "#000000", "#000000"], ["#fcfbe3", "#000000", "#fcfbe3"] ];
	}
	//http://gka.github.io/palettes/#colors=#fcfbe3,#ffffff|steps=4|bez=1|coL=1
	else if(blueprint.rootcolors.indexOf("lights") >= 0) {
		//palette.colorsets = [ ['#fcfbe3','#fdfcee','#fefdf5','#ffffff'], ['#fcfbe3','#fdfcee','#fefdf5','#ffffff'], ['#fcfbe3','#fdfcee','#fefdf5'], ['#fcfbe3','#fdfcee','#ffffff'] ];
		palette.colorsets = [ ['#aaaaaa','#c7c6bf','#e3e2d7','#ffffff'], ['#aaaaaa','#c7c6bf','#e3e2d7','#ffffff'], ['#aaaaaa','#c7c6bf','#ffffff'], ['#aaaaaa','#c7c6bf','#e3e2d7'] ];
	}
	else if(blueprint.rootcolors.indexOf("blues") >= 0) {
		palette.colorsets = [ ['#006699','#0a7293','#0a7c8e','#008888'], ['#006699','#0a7293','#0a7c8e','#008888'], ['#006699','#0a7293','#008888'], ['#006699','#0a7293','#0a7c8e'] ];
	}
	else if(blueprint.rootcolors.indexOf("yellows") >= 0) {
		palette.colorsets = [ ['#fcfbe3','#ffeba9','#ffdc6e','#ffcc00'], ['#fcfbe3','#ffeba9','#ffdc6e','#ffcc00'], ['#fcfbe3','#ffeba9','#ffcc00'], ['#fcfbe3','#ffeba9','#ffdc6e'] ];
	}
	else if(blueprint.rootcolors.indexOf("darks") >= 0) {
		palette.colorsets = [ ['#686860','#464540','#252523','#000000'], ['#686860','#464540','#252523','#000000'], ['#686860','#000000','#252523','#000000'], ['#686860','#464540', '#686860','#000000'] ];
	}
	else {
		palette.colorsets = [
			["#fcfbe3", "#000000"], //bw
			["#fcfbe3", "#000000"] //all
		];
		blueprint.rootcolors.forEach( function(color, j, array) {
			//console.log(palette.colorsets[1]);
			if( color !== "000000" && color !== "fcfbe3" ) {
				palette.colorsets[1].push("#"+color);
				var triad = ["#fcfbe3", "#"+color, "#000000", "#"+color];
				palette.colorsets.push(triad);
			}
		});
	}
	palette.colors =  palette.colorsets[1];
	blueprint.tools.logmsg("palette built ::: " + JSON.stringify(palette));



	return {
		pi: Math.PI,
		strokeColor: function() { return blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)] },
		strokeWidth: function() { return blueprint.tools.randominteger(blueprint.canvas.min*0.05, blueprint.canvas.min*0.2 ) },
		strokeDasharray: function( pathlength ) { return blueprint.tools.randominteger(blueprint.canvas.min*0.02, pathlength/3) },
		circlepathlength: function(r) { return blueprint.canvas.pi * 2* r },
		ellipsepathlength: function(rx, ry) { return blueprint.canvas.pi * 2* Math.sqrt( (rx*rx + ry*ry)/2) },
		rectanglepathlength: function(rx, ry) { return rx*2 + ry*2 },
		width: width, height: height, min: min, max: max,
		palette: palette,
		sketches: sketches,
		sketch: sketch,

		render: function( blueprint ) {
			var pagenumber = 0;
			var pdfdoc = new blueprint.pdfkit(
				{ 
					size: [parseInt(blueprint.canvas.width), parseInt(blueprint.canvas.height)],
					margins: {top: 20, bottom: 20, left: 20, right: 20}, //layout: "landscape",
					info: { Title: "chance", Author: "Kathy McTavish", Subject: "chance", Keywords: "net.art, chance" }

				});
			pdfdoc.pipe(blueprint.stream);
			pdfdoc.on("pageAdded", function() { pdfdoc.text( "page title ::: " + pagenumber); } );
			/*
			++pagenumber;
			pdfdoc.addPage();
			//set bg
			var color = blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)];
			pdfdoc.rect(0, 0, blueprint.canvas.width, blueprint.canvas.height).strokeOpacity(1.0).fillOpacity(1.0).fillAndStroke(color, color);
			++pagenumber;
			pdfdoc.addPage();
			color = blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)];
			pdfdoc.rect(0, 0, blueprint.canvas.width, blueprint.canvas.height).strokeOpacity(1.0).fillOpacity(1.0).fillAndStroke(color, color);
			*/
			
			var text = "chance", fsize = 88, top = 0, left = 0, width = 0, height = 0;
			var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'
			var earthprayer = "A prayer for our earth All-powerful God, you are present in the whole universe and in the smallest of your creatures. You embrace with your tenderness all that exists. Pour out upon us the power of your love, that we may protect life and beauty. Fill us with peace, that we may live as brothers and sisters, harming no one. O God of the poor, help us to rescue the abandoned and forgotten of this earth, so precious in your eyes. Bring healing to our lives, that we may protect the world and not prey on it, that we may sow beauty, not pollution and destruction. Touch the hearts of those who look only for gain at the expense of the poor and the earth. Teach us to discover the worth of each thing, to be filled with awe and contemplation, to recognize that we are profoundly united with every creature as we journey towards your infinite light. We thank you for being with us each day. Encourage us, we pray, in our struggle for justice, love and peace.";
			earthprayer = earthprayer + " "  + earthprayer;

			for(var f=0; f<blueprint.nframes; ++f) {
				blueprint.canvas.palette.colors = blueprint.canvas.palette.colorsets[ blueprint.tools.randominteger( 0, blueprint.canvas.palette.colorsets.length ) ];
				blueprint.canvas.sketch = blueprint.sketch !== "all" ? blueprint.tools.mod(parseInt(blueprint.sketch), blueprint.canvas.sketches.length) : blueprint.tools.randominteger(0, blueprint.canvas.sketches.length);
				var sketch = blueprint.canvas.sketches[ blueprint.canvas.sketch ];
				//set bg
				var color = blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)];
				pdfdoc.rect(0, 0, blueprint.canvas.width, blueprint.canvas.height).strokeOpacity(0.0).fillOpacity(1.0).fillAndStroke(color, color);
				//pdfdoc.circle(blueprint.canvas.width/2, blueprint.canvas.height/2, blueprint.canvas.min/2).clip()
				for(var d=0; d<blueprint.ndrawings; ++d) {
					/*
					var nslice = blueprint.tools.randominteger(0, earthprayer.length-1);
					text = earthprayer.slice(nslice) + earthprayer.slice(0, nslice);
					pdfdoc.fontSize(blueprint.tools.randominteger(blueprint.canvas.width*.05, blueprint.canvas.width*.2));
					pdfdoc.fillColor(blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)]);
					pdfdoc.text (text, 0, 0, {width: blueprint.canvas.width, height: blueprint.canvas.height, align: "left", stroke: false, fill: true} );
					*/
					var p = sketch.getp( blueprint, d );
					var parts = sketch.getsketch( blueprint, d, p );
					parts.forEach( function(part, d , array) {
						/*
						color = blueprint.canvas.strokeColor();
						pdfdoc.rect(100, -40, 600, 800).fillOpacity(0.6).fill("#006666");
						pdfdoc.rect(100, -40, 600, 800).lineWidth(100).stroke("#484848", 0.8);

						pdfdoc.rect(200, 20, 200, 300).lineWidth(100).fillAndStroke("#484848", "#000000");
							
							console.log(part.type);
						*/
						if( part.score.opacity !==0.0 ) {
							if (part.type === "circle" && blueprint.sketchset !== "circles") {
								if( part.score.fillOpacity > 0 ) {
									pdfdoc.circle(part.score.cx, part.score.cy, part.score.r).fill( part.score.fill,  part.score.fillOpacity );
								}
								if( part.score.strokeOpacity > 0 ) {
									pdfdoc.circle(part.score.cx, part.score.cy, part.score.r).lineWidth(part.score.strokeWidth).dash(part.score.strokeDasharray).stroke( part.score.stroke,  part.score.strokeOpacity );
								}
							}
							else if (part.type === "circle" && blueprint.sketchset === "circles") {
								if( part.score.fillOpacity > 0 ) {
									pdfdoc.circle(part.score.cx, part.score.cy, part.score.r).fill( part.score.fill,  part.score.fillOpacity );
								}
								if( part.score.strokeOpacity > 0 ) {
									var dash = blueprint.canvas.strokeDasharray(part.score.r * 2 * blueprint.canvas.pi)*0.3;
									var space =  blueprint.canvas.strokeDasharray(part.score.r * 2 * blueprint.canvas.pi)*0.6;
									pdfdoc.circle(part.score.cx, part.score.cy, part.score.r).lineWidth(part.score.strokeWidth).dash(dash, {space: space}).stroke( part.score.stroke,  part.score.strokeOpacity );
									dash = blueprint.canvas.strokeDasharray(part.score.r * 2 * blueprint.canvas.pi)*0.3;
									space =  blueprint.canvas.strokeDasharray(part.score.r * 2 * blueprint.canvas.pi)*0.6;
									pdfdoc.circle(part.score.cx, part.score.cy, part.score.r).lineWidth(part.score.strokeWidth).dash(dash, {space: space}).stroke( part.score.stroke,  part.score.strokeOpacity );
								}
							}
							else if (part.type === "ellipse") {
								if( part.score.fillOpacity > 0 ) {
									pdfdoc.ellipse(part.score.cx, part.score.cy, part.score.rx, part.score.ry).fill( part.score.fill,  part.score.fillOpacity );
								}
								if( part.score.strokeOpacity > 0 ) {
									pdfdoc.ellipse(part.score.cx, part.score.cy, part.score.rx, part.score.ry).lineWidth(part.score.strokeWidth).dash(part.score.strokeDasharray).stroke( part.score.stroke,  part.score.strokeOpacity );
								}
							}
							else if(part.type === "rect" && blueprint.sketchset !== "lines") {
								if( part.score.fillOpacity > 0 ) {
									pdfdoc.rect(part.score.x, part.score.y, part.score.width, part.score.height).fill( part.score.fill,  part.score.fillOpacity );
								}
								if( part.score.strokeOpacity > 0 ) {
									pdfdoc.rect(part.score.x, part.score.y, part.score.width, part.score.height).lineWidth(part.score.strokeWidth).dash(part.score.strokeDasharray).stroke( part.score.stroke,  part.score.strokeOpacity );
								}
								//console.log(part.score.x);console.log(part.score.y);console.log(part.score.width);console.log(part.score.height);console.log(part.score.strokeOpacity);console.log(part.score.fillOpacity);console.log(part.score.stroke);console.log(part.score.strokeWidth);
								
								//pdfdoc.rect(part.score.x, part.score.y, part.score.width, part.score.height).lineWidth(part.score.strokeWidth).strokeOpacity(part.score.strokeOpacity).fillOpacity(part.score.fillOpacity).fillAndStroke(part.score.stroke, part.score.stroke);	
							}
							else if(part.type === "rect" && blueprint.sketchset === "lines") {
								if( part.score.fillOpacity > 0 ) {
									pdfdoc.rect(part.score.x, part.score.y, part.score.width, part.score.height).fill( part.score.fill,  part.score.fillOpacity );
								}
								if( part.score.strokeOpacity > 0 ) {
									var dash = blueprint.canvas.strokeDasharray(part.score.width + part.score.height)*0.3;
									var space =  blueprint.canvas.strokeDasharray(part.score.width + part.score.height)*0.6;
									pdfdoc.rect(part.score.x, part.score.y, part.score.width, part.score.height).lineWidth(part.score.strokeWidth).dash(dash, {space: space}).stroke( part.score.stroke,  part.score.strokeOpacity );
									dash = blueprint.canvas.strokeDasharray(part.score.width + part.score.height)*0.3;
									space =  blueprint.canvas.strokeDasharray(part.score.width + part.score.height)*0.6; 
									pdfdoc.rect(part.score.x, part.score.y, part.score.width, part.score.height).lineWidth(part.score.strokeWidth).dash(dash, {space: space}).stroke( part.score.stroke,  part.score.strokeOpacity );
								}
								//console.log(part.score.x);console.log(part.score.y);console.log(part.score.width);console.log(part.score.height);console.log(part.score.strokeOpacity);console.log(part.score.fillOpacity);console.log(part.score.stroke);console.log(part.score.strokeWidth);
								
								//pdfdoc.rect(part.score.x, part.score.y, part.score.width, part.score.height).lineWidth(part.score.strokeWidth).strokeOpacity(part.score.strokeOpacity).fillOpacity(part.score.fillOpacity).fillAndStroke(part.score.stroke, part.score.stroke);	
							}
							
							else if (part.type === "line") {
								pdfdoc.polygon([part.score.x1, part.score.y1], [part.score.x2, part.score.y2]).lineWidth(part.score.strokeWidth).dash(part.score.strokeDasharray).stroke( part.score.stroke );	
							}
						}
					});
					blueprint.tools.logmsg("p = " + JSON.stringify(p) + ", sketch = " + blueprint.canvas.sketch );
					pdfdoc.fontSize(18);
					//var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.";
					//pdfdoc.text ('This text is left aligned. ' + lorem, {width: blueprint.canvas.width-100, height: blueprint.canvas.height-100, align: 'left'} );
					//blueprint.tools.logcontext( blueprint );
				}
				
				if(pagenumber < 1 || pagenumber === blueprint.nframes-1) {
					text = "chance";
					fsize = blueprint.canvas.width/(text.length-1);

					var deltaY = fsize/4;
					color = blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)];
					while(color === "#fcfbe3") {
						color = blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)];
					}
					left = blueprint.canvas.width/2 - fsize;
					top = blueprint.canvas.height/2;
					width = blueprint.canvas.width; 
					height = fsize + 2*deltaY;
					pdfdoc.rect(0, top - deltaY, width, height).fill(color);
					pdfdoc.fontSize(fsize); pdfdoc.fillColor("#ffffeb");
					pdfdoc.text (text, left, top, {width: width, height: height, align: "left", stroke: false, fill: true, characterSpacing:4} );
					pdfdoc.image("views/Tweed_T_black.png", 0, 0, {width: Math.min(blueprint.canvas.width,blueprint.canvas.height)*.2 });
					pdfdoc.image("views/legacy_logo_bw.png", {width: Math.min(blueprint.canvas.width,blueprint.canvas.height)*.2 });
				
				}
				else {
					color = blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)];
					while(color === "#fcfbe3") {
						color = blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)];
					}
					text = "mctavish ::: chance @ " + new Date().toISOString().slice(0, 16) + " ::: page " + pagenumber;
					fsize = blueprint.canvas.width/(text.length-1);
					pdfdoc.fontSize(fsize); 
					pdfdoc.rect(0, blueprint.canvas.height*0.9-20, blueprint.canvas.width, 50).fill(color);
					pdfdoc.fillColor("#ffffeb");

					pdfdoc.text (text, 0, blueprint.canvas.height*0.9, {width: blueprint.canvas.width-50, height: blueprint.canvas.height-100, align: "right", characterSpacing: 2});
				}
				if( f < blueprint.nframes-1) {
					++pagenumber;
					pdfdoc.addPage();
				}
			}
			
			pdfdoc.end();

			
			/*
			//set bg
			var color = blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)];
			pdfdoc.rect(0, 0, blueprint.width, blueprint.height).strokeOpacity(0.0).fillOpacity(0.8).fillAndStroke(color, "#ffffff");
			var j=0;
			var p = sketch.getp( blueprint, {}, j );
			
			var parts = sketch.getsketch( blueprint, {}, j, p );

			parts.forEach( function(part, j , array) {
				console.log(JSON.stringify(part.score));
				if(part.type === "rect") {
					pdfdoc.rect(part.score.x, part.score.y, part.score.width, part.score.height).lineWidth(strokeWidth()).strokeOpacity(part.score.strokeOpacity).fillOpacity(part.score.fillOpacity).dash(15, {space: 10}).fillAndStroke(strokeColor(), strokeColor());
				}
			});

			pdfdoc.lineWidth(25);
			pdfdoc.fontSize(25).text("Some text ! " + blueprint.sketch, 200, 200);
			pdfdoc.addPage();
			pdfdoc.fillColor("#484848");
			pdfdoc.rect(100, 100, 2000, 2000).lineWidth(strokeWidth()).fillOpacity(0.8).dash(15, {space: 10}).fillAndStroke("#484848", "#ffcc00");

			//pdfdoc.fillColor("#ffcc00").circle(72*8.5/2-50, 72*11/2-50, 72*8.5-100).stroke(); //circle(centerX, centerY, radius)
			pdfdoc.addPage();
			pdfdoc.moveTo(0, 20).lineTo(100, 72*8.5).quadraticCurveTo(130, 200, 150, 120).bezierCurveTo(190, -40, 200, 200, 300, 150).lineTo(400, 90).stroke();
			pdfdoc.end();
			*/
		},
	};

}



