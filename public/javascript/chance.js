function go( blueprint ) { 
	blueprint.tools = buildtools( blueprint );
	blueprint.sketchsets = buildsketchsets_chance(  );
	
	blueprint.clock = {
		now: new Date(), 
		start: new Date(),
		count: 0,
		drawingnoise: Math.floor( blueprint.dt * 120 * blueprint.ndrawings ),
		drawingduration: Math.floor( blueprint.dt * 280 * blueprint.ndrawings ),
		drawingdelay: Math.floor( blueprint.dt * 200 * blueprint.ndrawings ),
		duration: function() { return blueprint.tools.randominteger( blueprint.clock.drawingduration - blueprint.clock.drawingnoise, blueprint.clock.drawingduration + blueprint.clock.drawingnoise ) }, 
		delay: function() { return blueprint.tools.randominteger(blueprint.clock.drawingdelay - blueprint.clock.drawingnoise, blueprint.clock.drawingdelay + blueprint.clock.drawingnoise ) },

	};
	blueprint.canvas = buildcanvas( blueprint );
	blueprint.canvas.resize( blueprint );

	blueprint.sound = buildsound( blueprint );
	
	if( blueprint.phase !== "book") {
		blueprint.streams = {
			clock : Kefir.withInterval( 1000, function(emitter) { emitter.emit( { date: new Date() } ) })
				.scan( function(state, e){ 
					state.date = e.date;
					state.d = Math.floor(e.date.getSeconds()/10);
					state.q = Math.floor(e.date.getSeconds()/15);
					state.m = Math.floor(e.date.getTime()/(1000 * 60));
					if(state.currentd !== state.d) { state.newd=true; state.countd = state.countd +1; } else { state.newd=false; } 
					if(state.currentq !== state.q) { state.newq=true; state.countq = state.countq +1; } else { state.newq=false; } 
					state.currentd = state.d; 
					state.currentq = state.q;  
					state.count = state.count + 1; 
					return state }, 
					{ count: 0, q: 0, d: 0, m: Math.floor(new Date().getTime()/(1000 * 60)), currentd: 0, currentq: 0, countd: 0, countq: 0, newd: true, newq: true, date: new Date() } ),
			pointerdown : Kefir.merge( [ Kefir.fromEvents(document, "mousedown").map(function(e) { return { x: e.clientX, y: e.clientY } }), Kefir.fromEvents(document, "touchstart").map(function(e) { return { x: e.touches[0].clientX, y: e.touches[0].clientY } }) ]),
			pointerup : Kefir.merge([ Kefir.fromEvents(document, "mouseup"), Kefir.fromEvents(document, "touchend").map(function(e) { e.preventDefault(); return e; }) ]),
			windowresize : Kefir.fromEvents(window, "resize").throttle(200),
			//telegram : Kefir.fromEvents( blueprint.io.telegraph.ws, "message").map(function(e) { return { telegram: JSON.parse(e.data) } }),
		};
		blueprint.streams["clock"].onValue( function(e) {
			blueprint.clock.count = blueprint.clock.count + 1 ;
			blueprint.clock.now = e.date;
		});
		blueprint.streams["windowresize"].onValue( function(e) {
			blueprint.canvas.resize( blueprint );
		});
		if(blueprint.phase==="motion") {
			blueprint.streams["clock"].filter(function(x){ return x.newd && (x.d === 5 || x.d === 2) }).onValue( function( e ) {
				blueprint.canvas.widgets.clipframes.forEach( function(clip, j, array) {
					if( blueprint.canvas.clipping === "circle") {
						var r = blueprint.tools.randominteger(blueprint.canvas.min*0.2, blueprint.canvas.min*.4);
						//var cy = (blueprint.canvas.height)/2;
						//var cx = (blueprint.canvas.width)/2;
						var cy = blueprint.tools.randominteger(blueprint.canvas.height*0.3, blueprint.canvas.height*.6);
						var cx = blueprint.tools.randominteger(blueprint.canvas.width*0.3, blueprint.canvas.width*.6);
						Velocity({	
							elements: blueprint.canvas.widgets.clipframes[j],
							properties: {cx: cx, cy: cy, r: r},
							options: { duration: blueprint.clock.duration()*2, delay: 0,  easing: "easeInOutQuad", begin: blueprint.sound.playcorefreq },
						});
						Velocity({	
							elements: blueprint.canvas.widgets.clipframes[j],
							properties: {cx: cx, cy: cy, r: blueprint.canvas.max},
							options: { duration: blueprint.clock.duration(), delay: blueprint.clock.delay()*2,  easing: "easeInOutQuad", begin: blueprint.sound.playdrawings },
						});
					}
					else if( blueprint.canvas.clipping === "bars") {
						var width = blueprint.tools.randominteger(blueprint.canvas.width*0.05, blueprint.canvas.width*.2);
						var height = blueprint.tools.randominteger(blueprint.canvas.height*0.3, blueprint.canvas.height);
						var y = blueprint.tools.randominteger(0, blueprint.canvas.height-height);
						var x = blueprint.tools.randominteger(0, blueprint.canvas.width*.96);
						Velocity({	
							elements: blueprint.canvas.widgets.clipframes[j],
							properties: {x: x, y: y, width: width, height: height},
							options: { duration: blueprint.clock.duration()*2, delay: 0,  easing: "easeInOutQuad", begin: blueprint.sound.playcorefreq },
						});
						Velocity({	
							elements: blueprint.canvas.widgets.clipframes[j],
							properties: {x: 0, y:0, width: blueprint.canvas.width, height:  blueprint.canvas.height},
							options: { duration: blueprint.clock.duration(), delay: blueprint.clock.delay()*2,  easing: "easeInOutQuad", begin: blueprint.sound.playdrawings },
						});	
					}
					else if( blueprint.canvas.clipping === "text") {
						var width = blueprint.canvas.width;
						var n = blueprint.canvas.widgets.clipframes[j].getAttributeNS(null, "n");
						var y = (blueprint.canvas.height)/2;
						Velocity({	
							elements: blueprint.canvas.widgets.clipframes[j],
							properties: {x: blueprint.tools.randominteger(-blueprint.canvas.width*0.1, blueprint.canvas.width*0.1), y: blueprint.tools.randominteger(blueprint.canvas.height*0.2, blueprint.canvas.height*1.1), fontSize: blueprint.tools.randominteger(width/n, width*2) + "px"},
							options: { duration: blueprint.clock.duration()*2, delay: 0,  easing: "easeInOutQuad" },
						});
						Velocity({	
							elements: blueprint.canvas.widgets.clipframes[j],
							properties: {x: blueprint.tools.randominteger(-blueprint.canvas.width*0.1, blueprint.canvas.width*0.1), y: blueprint.tools.randominteger(blueprint.canvas.height*0.2, blueprint.canvas.height), fontSize: blueprint.tools.randominteger(width/n, width) + "px"},
							options: { duration: blueprint.clock.duration(), delay: blueprint.clock.delay()*2,  easing: "easeInOutQuad", begin: blueprint.sound.playdrawings() },
						});	
					}
					else {
						var width = blueprint.tools.randominteger(blueprint.canvas.width*0.1, blueprint.canvas.width*.6);
						var height = blueprint.tools.randominteger(blueprint.canvas.height*0.1, blueprint.canvas.height*.6);
						var y = (blueprint.canvas.height-height)/2;
						var x = (blueprint.canvas.width - width)/2;
						Velocity({	
							elements: blueprint.canvas.widgets.clipframes[j],
							properties: {x: x, y: y, width: width, height: height},
							options: { duration: blueprint.clock.duration()*2, delay: 0,  easing: "easeInOutQuad", begin: blueprint.sound.playcorefreq() },
						});
						Velocity({	
							elements: blueprint.canvas.widgets.clipframes[j],
							properties: {x: 0, y:0, width: blueprint.canvas.width, height: blueprint.canvas.height},
							options: { duration: blueprint.clock.duration(), delay: blueprint.clock.delay()*2,  easing: "easeInOutQuad", begin: blueprint.sound.playdrawings() },
						});		
					}

				});
		
					
			});
		}
		blueprint.streams["clock"].filter(function(x){ return x.newq }).onValue( function( e ) {
			if( blueprint.sketch === "all" ) {
				blueprint.canvas.sketch = ( parseInt(blueprint.quartet) + Math.floor( e.m / 2 ) ) % blueprint.canvas.sketches.length;
				blueprint.tools.logmsg("blueprint.canvas.sketch = " + blueprint.canvas.sketch);
				blueprint.tools.logmsg("current sketch = " + blueprint.canvas.sketch);
			}
			blueprint.canvas.clipping = blueprint.canvas.clippings[e.m % blueprint.canvas.clippings.length];
			blueprint.tools.logmsg("**e.m = " + e.m);
			blueprint.tools.logmsg("blueprint.clipping = " + blueprint.canvas.clipping);
		});

		var step = blueprint.phase === "motion" ? blueprint.dt : blueprint.dt;
		blueprint.streams["clock"].filter(function(x){ return x.count % step === 0})
			.scan( function(state, e){ 
				state.clock = e;
				state.count = state.count + 1; return state }, { count: 0, clock: { d: 0, q: 0, m: Math.floor(new Date().getTime()/(1000 * 60)), currentd: 0, currentq: 0, newd: true, newq: true, date: new Date() } } )
			.onValue( function( e ) {
				blueprint.canvas.render( blueprint, blueprint.canvas.sketches[ blueprint.canvas.sketch ], e );
			});
		if(blueprint.phase==="motion") {
			blueprint.streams["clock"].filter(function(x){ return x.newq }).onValue( function( e ) {
				var color = function(  ) { return blueprint.canvas.palette.colors[(e.q + blueprint.number) %  blueprint.canvas.palette.colors.length] }; //blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)]
				
				var p1 = [
					{ opacity: 0.0, x: -blueprint.canvas.width, y: 0, width: 0.0, height: blueprint.canvas.height, fill: color() },
					{ opacity: 0.0, x: blueprint.canvas.width, y: 0, width: 0.0, height: blueprint.canvas.height,  fill: color() },
					{ opacity: 0.0, x: 0, y: -blueprint.canvas.height, width: blueprint.canvas.width, height: 0,  fill: color() },
					{ opacity: 0.0, x: 0, y: blueprint.canvas.height, width: blueprint.canvas.width, height: 0,  fill: color() },

				];
				var p2 = [
					{ opacity:1.0, x: 0, y: 0, width: blueprint.canvas.width, height: blueprint.canvas.height, fill: color() }
				]
				var bghide = blueprint.canvas.widgets.bgframes[ e.q % 2 ];
				var bgshow = blueprint.canvas.widgets.bgframes[ (e.q + 1) % 2 ];
				bghide.setAttributeNS(null, "stroke", "none");
				Velocity({	
					elements: bghide,
					properties: p1[ blueprint.tools.randominteger(0, p1.length) ] ,
					options: { duration: blueprint.tools.randominteger(1200,2000), delay: blueprint.tools.randominteger(200,400),  easing: "easeInOutQuad", begin: blueprint.sound.playcorefreq }
				});

				bgshow.setAttributeNS(null, "stroke", "none");
				Velocity({	
					elements: bgshow,
					properties: p2[ blueprint.tools.randominteger(0, p2.length) ],
					//options: { duration: blueprint.tools.randominteger(1200,2000), delay: blueprint.tools.randominteger(200,400),  easing: "easeInOutQuad", begin: function() { blueprint.sound.playnote( { frequency: blueprint.sound.playcorefreq(), volume: 0.04, duration: 3.0, fadetime: 0.6, delay: 0 } ); }},
					options: { duration: blueprint.tools.randominteger(1200,2000), delay: blueprint.tools.randominteger(200,400),  easing: "easeInOutQuad" },
				});
			});
		}
		blueprint.streams["clock"].onValue( function(e) {
			//var frequency = blueprint.sound.chord[ blueprint.tools.randominteger(0, blueprint.sound.chord.length) ] + blueprint.tools.randominteger(-2, 2) + blueprint.tools.randominteger(-20, 20);
			//var delay = blueprint.tools.randominteger(0, 10) / 10.0;
			//blueprint.sound.playnote( { frequency: blueprint.sound.corefreq, volume: 0.02, duration: 1.0, fadetime: 0.3, delay: blueprint.tools.randominteger(0, 10) / 10.0 } );
			//blueprint.sound.playnote( { frequency: [blueprint.sound.corefreq/2, blueprint.sound.corefreq*2][blueprint.tools.randominteger(0,1)], volume: 0.01, duration: 0.4, fadetime: 0.1, delay: 0 } );
			if(e.count%4===blueprint.number) blueprint.sound.playnote( { frequency: blueprint.sound.corefreq/2, volume: 0.02, duration: 1, fadetime: 0.2, delay: 0 } );
			else if(e.count%7===0) blueprint.sound.playnote( { frequency: blueprint.sound.corefreq, volume: 0.02, duration: 1, fadetime: 0.2, delay: 0 } ); 
			//else if(e.count%5===0) blueprint.sound.playnote( { frequency: blueprint.sound.corefreq*2, volume: 0.02, duration: 1.2, fadetime: 0.1, delay: 0 } ); 
			else blueprint.sound.playnote( { frequency: blueprint.sound.chord[ blueprint.tools.randominteger(0, blueprint.sound.chord.length) ] , volume: 0.03, duration: 1.5, fadetime: 0.4, delay: blueprint.tools.randominteger(0, 10) / 10.0 } ); 
		});

		blueprint.streams["clock"].filter(function(x){ return x.newq }).onValue( function(e) {
			var n = (blueprint.quartet + e.date.getMinutes()) % blueprint.sound.freqchoices.length;
			//var n = (e.date.getMinutes()) % blueprint.sound.freqchoices.length; // all at the same time
			var choice = blueprint.sound.freqchoices[ n ];
			blueprint.sound.corefreq = choice.core;
			blueprint.sound.chord = choice.chord;
			blueprint.tools.logmsg("num = " + n + "::: blueprint.sound.chord = " + JSON.stringify(blueprint.sound.chord ));

			if(e.currentq%3===0) { blueprint.sound.playnote( { frequency: blueprint.sound.corefreq/4, volume: 0.09, duration: 4.0, fadetime: 0.3, delay: blueprint.tools.randominteger(0, 9) } ); }
			//blueprint.sound.playnote( { frequency: blueprint.sound.corefreq/4, volume: 0.09, duration: 0.4, fadetime: 0.04, delay: blueprint.tools.randominteger(1, 14) } );
			//blueprint.sound.playnote( { frequency: blueprint.sound.corefreq/4, volume: 0.09, duration: 0.4, fadetime: 0.04, delay: blueprint.tools.randominteger(2, 14) } );
			//blueprint.sound.playnote( { frequency: blueprint.sound.corefreq/4, volume: 0.09, duration: 0.4, fadetime: 0.04, delay: blueprint.tools.randominteger(2, 14) } );

		});

		blueprint.streams["clock"].filter(function(x){ return x.newq }).onValue( function(e) {
			blueprint.canvas.palette.colors = blueprint.canvas.palette.colorsets[e.m%blueprint.canvas.palette.colorsets.length];
			/*
			if( e.date.getMinutes() % 5 === 0 ) { //e.date.getSeconds()/10
				blueprint.canvas.palette.colors =  blueprint.canvas.palette.colorsets.bw;
			}
			else if( e.date.getMinutes() % 3 === 0 ) {
				blueprint.canvas.palette.colors =  blueprint.canvas.palette.colorsets.triads[ e.q % blueprint.canvas.palette.colorsets.triads.length ];
			}
			else  { 
				blueprint.canvas.palette.colors =  blueprint.canvas.palette.colorsets.all;
			}
			*/
			blueprint.tools.logmsg("blueprint.canvas.palette.colors = " + JSON.stringify(blueprint.canvas.palette.colors));
		});
		blueprint.streams["pointerdown"].onValue( function(e) {
			blueprint.tools.logmsg("touch ::: x = " + e.x + ", y = " + e.y);
			
		});
		blueprint.streams["pointerdown"].filter(function(e){ return ( e.x < blueprint.canvas.width*0.4 && e.y > blueprint.canvas.height*0.6 ) }).onValue( function(e) {
			blueprint.tools.logmsg("click!");
			blueprint.tools.copyLogNode(blueprint.canvas.widgets.svgframes[0]);
		});
	}
	else {
		var sketch = blueprint.canvas.sketches[ blueprint.canvas.sketch ];

		for(var f=0; f<blueprint.nframes; ++f) {
			blueprint.canvas.palette.colors =  blueprint.canvas.palette.colorsets[f%blueprint.canvas.palette.colorsets.length];
			blueprint.canvas.widgets.bgframes[0].setAttributeNS(null, "fill", blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)]);
			console.log("** f = " + f + ", blueprint.canvas.palette.colors = " + blueprint.canvas.palette.colors);
			for(var d=0; d<blueprint.ndrawings; ++d) {
				var drawing = blueprint.canvas.widgets.drawings[d + f*blueprint.ndrawings];
				console.log("drawing.id = " + drawing.getAttribute("id"));
				console.log("** d + f*blueprint.ndrawings = " + parseInt(d + f*blueprint.ndrawings), "** drawingid = " + drawing.getAttribute("id"));
				var p = sketch.getp( blueprint, d );
				blueprint.tools.logmsg("p = " + JSON.stringify(p));
				var parts = sketch.getsketch( blueprint, d, p );
				parts.forEach( function(part, d , array) {
					for (var p in part.score) {
						if( part.score.hasOwnProperty( p ) ) {
							drawing.querySelector(part.element).setAttributeNS(null, p.replace(/([A-Z])/g, "-$1").toLowerCase(), part.score[p]);
						} 
					}
				});
			}
			document.querySelector("#codef"+f).innerHTML = blueprint.tools.safetags('<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg>'+ blueprint.canvas.widgets.svgframes[f].outerHTML.replace(/(\r\n|\r|\n)/gm,"") );
		}
	}
}
