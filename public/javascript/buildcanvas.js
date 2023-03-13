function buildcanvas( blueprint ) {
	var width = blueprint.width < 20 ? window.innerWidth : blueprint.width;
	var height = blueprint.height < 20 ? window.innerHeight : blueprint.height;
	var min = Math.min(width, height);
	var max = Math.max(width, height);
	var widgets = {};
	widgets.bgframes = document.querySelectorAll(".bgframe"); //in sketchsets_chance
	widgets.drawings = document.querySelectorAll(".drawing"); //in sketchsets_chance
	widgets.svgframes = document.querySelectorAll(".svgframe"); //in sketchsets_chance
	widgets.clipframes = document.querySelectorAll(".clipframe");

	var sketches = blueprint.sketchsets[blueprint.sketchset];
	var sketch = blueprint.sketch !== "all" ? blueprint.tools.mod(parseInt(blueprint.sketch), sketches.length) : blueprint.tools.mod( ( parseInt(blueprint.quartet) + parseInt(blueprint.clock.now.getHours()) ), sketches.length);

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

	var clippings = [ blueprint.clipping ];
	console.log(clippings[0]);
	if(blueprint.clipping==="all") { clippings = ["box","circle","box", "bars"]; }
	var clipping = clippings[0];
	return  {
		width: width, height: height, min: min, max: max,
				resize: function( blueprint ) {
				blueprint.canvas.width = blueprint.width < 20 ? window.innerWidth : blueprint.width;
				blueprint.canvas.height = blueprint.height < 20 ? window.innerHeight : blueprint.height;
					
				blueprint.canvas.max = Math.max(blueprint.canvas.width, blueprint.canvas.height);
				blueprint.canvas.min = Math.min(blueprint.canvas.width, blueprint.canvas.height);
				
				blueprint.canvas.widgets.svgframes.forEach( function( svgframe, j, array ) {
					svgframe.setAttributeNS(null, "width", blueprint.canvas.width);
					svgframe.setAttributeNS(null, "height", blueprint.canvas.height);
					svgframe.setAttributeNS(null, "viewbox", "0 0 " + blueprint.canvas.width + " " + blueprint.canvas.height);
				});
				for(var j=0; j<blueprint.canvas.widgets.clipframes.length; ++j) {
					if( blueprint.clipping === "circle") {
						blueprint.canvas.widgets.clipframes[j].setAttributeNS(null, "cx", blueprint.canvas.width/2);
						blueprint.canvas.widgets.clipframes[j].setAttributeNS(null, "cy", blueprint.canvas.height/2);
						blueprint.canvas.widgets.clipframes[j].setAttributeNS(null, "r", blueprint.canvas.max);
					}
					else if( blueprint.clipping !== "text"){
						blueprint.canvas.widgets.clipframes[j].setAttributeNS(null, "width", blueprint.canvas.width);
						blueprint.canvas.widgets.clipframes[j].setAttributeNS(null, "height", blueprint.canvas.height);
					}
				} 
				blueprint.canvas.widgets.bgframes.forEach( function( bgframe, j, array ) {
					bgframe.setAttributeNS(null, "width", blueprint.canvas.width);
					bgframe.setAttributeNS(null, "height", blueprint.canvas.height);
					bgframe.setAttributeNS(null, "fill", blueprint.canvas.palette.colors[blueprint.tools.randominteger(0, blueprint.canvas.palette.colors.length)] );
				});
				blueprint.tools.logmsg( "width = " + blueprint.canvas.width + ", height = " +  blueprint.canvas.height );
		},
		render: function( blueprint, sketch, e ) {
			var j = e.count % (blueprint.ndrawings*blueprint.nframes);
			var drawing = blueprint.canvas.widgets.drawings[j];
			var p = sketch.getp( blueprint, j );
			blueprint.tools.logmsg("p = " + JSON.stringify(p));
			var parts = sketch.getsketch( blueprint, j, p );
			if( blueprint.phase === "motion") {

				parts.forEach( function(part, j , array) {
					if(part.content) {drawing.querySelector(part.element).textContent=part.content}
					Velocity({	
						elements: drawing.querySelector(part.element),
						properties: part.score,
						options: { duration: blueprint.clock.duration(), delay: blueprint.clock.delay(),  easing: "easeInOutQuad", begin: blueprint.sound.playdrawings },
					});
					
					
				});
			}
			else {
				blueprint.canvas.widgets.bgframes.forEach( function(frame) {
						frame.setAttributeNS(null, "stroke", "none");
						frame.setAttributeNS(null, "fill", blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)]);
					});
				parts.forEach( function(part, j , array) {
					for (var p in part.score) {
						if( part.score.hasOwnProperty( p ) ) {
							drawing.querySelector(part.element).setAttributeNS(null, p.replace(/([A-Z])/g, "-$1").toLowerCase(), part.score[p]);
						} 
					}
				});
			}
		}


		
	}
};