function buildsketchsets_chance(  ) {

return {
widgets: [
],
palette: palette,
		
		sketch: sketch,
		clippings: [],
		clipping: null,
		fill: false, stroke: true,
		
		strokeColor: function() { return blueprint.canvas.palette.colors[blueprint.tools.randominteger(0,blueprint.canvas.palette.colors.length)] },
		strokeWidth: function() { return blueprint.tools.randominteger(blueprint.canvas.min*0.05, blueprint.canvas.min*0.2 ) },
		strokeDasharray: function( pathlength ) { return blueprint.tools.randominteger(blueprint.canvas.min*0.02, pathlength/3) },

fill: false, stroke: true,
initialize: function(blueprint) {
//build drawing elements & add to list of element pointers with id & type (widgets)
//
},
stop(blueprint) {

},
renderBackground_motion(blueprint) {

},
renderClipping_motion(blueprint) {

},
renderSketches_motion(blueprint) {

},
renderSketches_stills(blueprint) {

},
core: 
	[
	/*
	sketch 0
	*/
	{
		getp: function( blueprint, j ) {
			var rx = blueprint.tools.randominteger(blueprint.canvas.max*.1, blueprint.canvas.max*.4);
			var ry = rx;
			var cx = blueprint.canvas.width / 2.0;
			var cy = blueprint.canvas.height / 2.0;
			var r = rx;
			var content = "chance";
			return { content: content, rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth() / 2,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.rx ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth() ,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 0.0,
						x: p.cx - p.rx,
						y: p.cy - p.ry,
						width: p.rx * 2,
						height: p.ry * 2,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth() /2,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.rectanglepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 1.0,
						x1: -blueprint.canvas.width*blueprint.tools.randominteger(1,3),
						x2: blueprint.canvas.width*blueprint.tools.randominteger(1,3),
						y1: p.cy,
						y2: p.cy,
						strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(1.5,3),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.width ) / blueprint.tools.randominteger(1,3),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: -blueprint.canvas.height*blueprint.tools.randominteger(1,3),
						y2: blueprint.canvas.height*blueprint.tools.randominteger(1,3),
						strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(1.5,3),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height ) / blueprint.tools.randominteger(1,3),
						stroke: blueprint.canvas.strokeColor()
					}	
				},
				{
					element: "text", type: "text",
					score: {
						opacity: 1.0,
						x: blueprint.tools.randominteger(-.8*blueprint.canvas.width,blueprint.canvas.width*.9),
						y: blueprint.tools.randominteger(-.05*blueprint.canvas.height,blueprint.canvas.height),
						fontSize: blueprint.tools.randominteger(.4*blueprint.canvas.min,blueprint.canvas.min*2),
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(1,3),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height ) / blueprint.tools.randominteger(4,8),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					},
					content: p.content
				}
			];
			return parts;
		}
	},
	/*
	sketch 1
	*/
	{
		getp: function( blueprint, j ) {
			var rx = blueprint.tools.randominteger(blueprint.canvas.min*.2, blueprint.canvas.min*.8);
			var ry = blueprint.tools.randominteger(blueprint.canvas.min*.2, blueprint.canvas.min*.8);
			var cx = blueprint.canvas.width / 2.0;
			var cy = blueprint.canvas.height / 2.0;
			var r = rx;
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
			{ 
				element: "circle", type: "circle",
				score: {
					opacity: 1.0,
					cx: p.cx,
					cy: p.cy,
					r: p.r,
					fillOpacity: 0.0,
					strokeOpacity: 1.0,
					strokeWidth: blueprint.canvas.strokeWidth(),
					strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
					stroke: blueprint.canvas.strokeColor()
				}
			},
			{
				element: "ellipse", type: "ellipse",
				score: {
					opacity: 1.0,
					cx: p.cx,
					cy: p.cy,
					rx: p.rx,
					ry: p.ry,
					fillOpacity: 0.0,
					strokeOpacity: 1.0,
					strokeWidth: blueprint.canvas.strokeWidth()/2,
					strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
					stroke: blueprint.canvas.strokeColor()	
				}
			},
			{
				element: "rect", type: "rect",
				score: {
					opacity: 0.0,
					x: p.cx - p.rx,
					y: p.cy - p.ry,
					width: p.rx * 2,
					height: p.ry * 2,
					fillOpacity: 0.0,
					strokeOpacity: 1.0,
					strokeWidth: blueprint.canvas.strokeWidth()/2,
					strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.rectanglepathlength( p.rx, p.ry ) ),
					stroke: blueprint.canvas.strokeColor()
				}
			},
			{
				element: ".hline", type: "line",
				score: {
					opacity: 1.0,
					x1: -blueprint.canvas.width*blueprint.tools.randominteger(1,2),
					x2: blueprint.canvas.width*blueprint.tools.randominteger(1,2),
					y1: p.cy,
					y2: p.cy,
					strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(1.5,3),
					strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.width ) / blueprint.tools.randominteger(1,3),
					stroke: blueprint.canvas.strokeColor()
				}
			},
			{
				element: ".vline", type: "line",
				score: {
					opacity: 1.0,
					x1: p.cx,
					x2: p.cx,
					y1: -blueprint.canvas.height*blueprint.tools.randominteger(1,2),
					y2: blueprint.canvas.height*blueprint.tools.randominteger(1,2),
					strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(1.5,3),
					strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height ) / blueprint.tools.randominteger(1,3),
					stroke: blueprint.canvas.strokeColor()
				}	
			}
			];
			return parts;
		},
	},
	/*
	sketch 2
	*/
	{
		getp: function( blueprint, j ) {
			var rx = blueprint.canvas.max*0.5 - (j%blueprint.ndrawings)*blueprint.canvas.max*0.1;
			var ry = blueprint.canvas.max*0.5 - (j%blueprint.ndrawings)*blueprint.canvas.max*0.1;
			var cx = blueprint.canvas.width / 2.0;
			var cy = blueprint.canvas.height / 2.0;
			var r = blueprint.canvas.min*0.5;
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
						stroke: blueprint.canvas.strokeColor(),
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 1.0,
						x: 0,
						y: 0,
						width: blueprint.canvas.width,
						height: blueprint.canvas.height,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.rectanglepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 0.0,
						x1: 0,
						x2: blueprint.canvas.width,
						y1: p.cy,
						y2: p.cy,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.width ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: -blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						y2: blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height ),
						stroke: blueprint.canvas.strokeColor()
					}	
				}
			];
			return parts;
		},
	},

	/*
	sketch 3
	*/
	{
		getp: function( blueprint, j ) {
			var cx = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.8);
			var cy = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.8);
			var rx = blueprint.tools.randominteger(blueprint.canvas.min*.3, blueprint.canvas.min*.6) ;
			var ry = blueprint.tools.randominteger(blueprint.canvas.min*.3, blueprint.canvas.min*.6) ;
			var r = blueprint.tools.randominteger(blueprint.canvas.min*.2, blueprint.canvas.min*.5) ;
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth()/2,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
						stroke: blueprint.canvas.strokeColor(),
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 1.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth()/2,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor(),
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 0.0,
						x: 0,
						y: 0,
						width: blueprint.canvas.width,
						height: blueprint.canvas.height,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.rectanglepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 1.0,
						x1: -blueprint.canvas.width*blueprint.tools.randominteger(1,2),
						x2: blueprint.canvas.width*blueprint.tools.randominteger(1,2),
						y1: p.cy,
						y2: p.cy,
						strokeWidth: blueprint.canvas.strokeWidth() *3,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.width ) / 2,
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: -blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						y2: blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						strokeWidth: blueprint.canvas.strokeWidth() *3,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height ) / 2,
						stroke: blueprint.canvas.strokeColor()
					}	
				}
				
			];
			return parts;
		},
	},
	/*
	sketch 4
	*/
	{
		getp: function( blueprint, j ) {
			var rx = blueprint.tools.randominteger(blueprint.canvas.min*0.2, blueprint.canvas.max*0.4);
			var ry = blueprint.canvas.height*0.6;
			var cx = blueprint.tools.randominteger((j%blueprint.ndrawings) * Math.floor( blueprint.canvas.width /5.0),  (j%blueprint.ndrawings) * Math.floor( blueprint.canvas.width / 3.0 ) );
			var cy = blueprint.canvas.height*0.5;
			var r = rx*0.9;			
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 1.0,
						strokeOpacity: 0.0,
						strokeWidth: 0,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
						fill: blueprint.canvas.strokeColor(),
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 1.0,
						x: p.cx - p.rx,
						y: p.cy - p.ry,
						width: p.rx*2,
						height: p.ry*2,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.rectanglepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 1.0,
						x1: -blueprint.canvas.width*blueprint.tools.randominteger(1,2),
						x2: blueprint.canvas.width*blueprint.tools.randominteger(1,2),
						y1: p.cy,
						y2: p.cy,
						strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(1,3),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.width ) / blueprint.tools.randominteger(1,2),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: -blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						y2: blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(1,3),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height )  / blueprint.tools.randominteger(1,2),
						stroke: blueprint.canvas.strokeColor()
					}	
				}
			];
			return parts;
		},
	},
	/*
	sketch 5
	*/
	{
		getp: function( blueprint, j ) {
			var rx = blueprint.tools.randominteger(blueprint.canvas.min*0.2, blueprint.canvas.min*0.8);
			var ry = blueprint.canvas.height*0.6;
			var cx = [ blueprint.tools.randominteger(j*blueprint.canvas.width/5.0, 10+(j%blueprint.ndrawings)*blueprint.canvas.width / 3.0 ), blueprint.tools.randominteger((j%blueprint.ndrawings)*blueprint.canvas.width/5.0,  10+(j%blueprint.ndrawings)*blueprint.canvas.width / 3.0 ), blueprint.canvas.width/2][ blueprint.tools.randominteger(0,2) ];
			var cy = blueprint.canvas.height*0.5;
			var r = rx*0.9;
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 1.0,
						strokeOpacity: 0.0,
						strokeWidth: 0,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
						fill: blueprint.canvas.strokeColor(),
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 1.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 1.0,
						x: 0,
						y: -blueprint.canvas.height/2,
						width: blueprint.canvas.width,
						height: blueprint.canvas.height*2,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth()*8,
						strokeDasharray: blueprint.tools.randominteger( 10+(j%blueprint.ndrawings)*10, 18+(j%blueprint.ndrawings)*13),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 1.0,
						x1: -blueprint.canvas.width*blueprint.tools.randominteger(1,2),
						x2: blueprint.canvas.width*blueprint.tools.randominteger(1,2),
						y1: p.cy,
						y2: p.cy,
						strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(2,3),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.width ) / blueprint.tools.randominteger(1,2),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 0.0,
						x1: p.cx,
						x2: p.cx,
						y1: -blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						y2: blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						strokeWidth: blueprint.canvas.strokeWidth() / blueprint.tools.randominteger(1,3),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height )  / blueprint.tools.randominteger(1,2),
						stroke: blueprint.canvas.strokeColor()
					}	
				}
				
			];
			return parts;
		},
	},
	/*
	sketch 6
	*/
	{
		getp: function( blueprint, j ) {
			var rx = blueprint.tools.randominteger(blueprint.canvas.min*0.2, blueprint.canvas.min*0.8);
			var ry = blueprint.tools.randominteger(blueprint.canvas.min*0.2, blueprint.canvas.min*0.8);;
			var cx = [ 0,  blueprint.canvas.width/2, blueprint.canvas.width, blueprint.canvas.width/2 ][blueprint.tools.randominteger(0,3)];
			var cy = blueprint.canvas.height*0.5;
			var r = Math.min(rx,ry)*0.9;
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 1.0,
						strokeOpacity: 0.0,
						strokeWidth: 0,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
						fill: blueprint.canvas.strokeColor(),
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 1.0,
						x:  0,
						y: -blueprint.canvas.height/2,
						width: blueprint.canvas.width,
						height: blueprint.canvas.height*2,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth()*4,
						strokeDasharray: blueprint.canvas.strokeDasharray(blueprint.canvas.rectanglepathlength( blueprint.canvas.width, blueprint.canvas.height )) / 6,
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 1.0,
						x1: -blueprint.canvas.width*blueprint.tools.randominteger(1,2),
						x2: blueprint.canvas.width*blueprint.tools.randominteger(1,2),
						y1: p.cy,
						y2: p.cy,
						strokeWidth: blueprint.canvas.strokeWidth() * 2,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.width ) / 3,
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: -blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						y2: blueprint.canvas.height*blueprint.tools.randominteger(1,2),
						strokeWidth: blueprint.canvas.strokeWidth()*2,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height )  / 3,
						stroke: blueprint.canvas.strokeColor()
					}	
				}
			];
			return parts;
		},
	},
	/*
	sketch 7
	*/
	/*
	{
		getp: function( blueprint, j ) {
			var rx = blueprint.tools.randominteger(blueprint.canvas.min*0.2, blueprint.canvas.min*0.6);
			var ry = blueprint.tools.randominteger(blueprint.canvas.min*0.2, blueprint.canvas.min*0.6);;
			//var cx = [ 0,  blueprint.canvas.width/2, blueprint.canvas.width, blueprint.canvas.width/2 ][blueprint.tools.randominteger(0,3)];
			var cx = blueprint.canvas.width*0.5;
			var cy = blueprint.canvas.height*0.5;
			var r = rx;			r
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 1.0,
						strokeOpacity: 0,
						strokeWidth: 0,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
						fill: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 0.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 1.0,
						strokeOpacity: 0.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						fill: blueprint.canvas.strokeColor(),
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 1.0,
						x: 0,
						y: 0,
						width: blueprint.canvas.width,
						height: blueprint.canvas.height,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth()*3,
						//strokeWidth: blueprint.canvas.min/2,
						strokeDasharray: blueprint.canvas.strokeDasharray(blueprint.canvas.rectanglepathlength( blueprint.canvas.width, blueprint.canvas.height )),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 0.0,
						x1: 0,
						x2: blueprint.canvas.width,
						y1: 0,
						y2: 0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						//strokeWidth: blueprint.canvas.height,
						strokeDasharray: Math.max(blueprint.canvas.min*0.03, blueprint.canvas.strokeDasharray( blueprint.canvas.min )/4),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: 0,
						y2: blueprint.canvas.height,
						//strokeWidth: blueprint.canvas.strokeWidth()*8,
						strokeWidth: blueprint.canvas.width,
						strokeDasharray: Math.max(blueprint.canvas.min*0.03, blueprint.canvas.strokeDasharray( blueprint.canvas.min )/4),
						stroke: blueprint.canvas.strokeColor()
					}	
				}
			];
			return parts;
		},
	},
	*/
	/*
	sketch 8
	*/
	{
		getp: function( blueprint, j ) {
			var rx = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*0.5);
			var ry = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*1.1);
			var cx = blueprint.tools.randominteger(0,blueprint.canvas.width);
			//var cy = blueprint.canvas.height / 2.0;
			var cy = [0, blueprint.canvas.height][j % 2];
			var r = rx*0.8;
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 1.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth() * 0.5,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 1.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth() * 0.5,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 1.0,
						x: 0,
						y: blueprint.tools.randominteger(blueprint.canvas.height*.45,blueprint.canvas.height*.55),
						width: blueprint.canvas.width,
						height: blueprint.tools.randominteger(blueprint.canvas.height*.1,blueprint.canvas.height*.2),
						fillOpacity: 1.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth()*0.4,
						strokeDasharray: blueprint.canvas.strokeDasharray( p.rx*2 )*0.4,
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx-p.rx*1.1,
						x2: p.cx+p.rx*1.1,
						y1: p.cy,
						y2: p.cy,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( p.rx ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: p.cy===0?0:blueprint.canvas.height-p.ry,
						y2: p.cy===0?p.ry:blueprint.canvas.height,
						strokeWidth: blueprint.canvas.strokeWidth()*0.3,
						strokeDasharray: blueprint.canvas.strokeDasharray( p.ry ),
						stroke: blueprint.canvas.strokeColor()
					}	
				}

			];
			return parts;
		},
	},
	/*
	sketch 9
	*/
	{
		getp: function( blueprint, j ) {
			var ry = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*0.5);
			var rx = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*0.68) ;
			var cy = blueprint.tools.randominteger(0,blueprint.canvas.height);
			var cx = [0, blueprint.canvas.width][j % 2];
			var r = ry*0.8;
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 1.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth() * 0.5,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.r ) ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 1.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth() * 0.5,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 1.0,
						x: blueprint.tools.randominteger(blueprint.canvas.width*.38,blueprint.canvas.width*.4),
						y: 0,
						width: blueprint.tools.randominteger(blueprint.canvas.width*.03,blueprint.canvas.width*.06),
						height: blueprint.canvas.height,
						fillOpacity: 1.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( p.rx*2 )*0.4,
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx===0?0:blueprint.canvas.width-p.rx,
						x2: p.cx===0?p.rx:blueprint.canvas.width,
						y1: p.cy,
						y2: p.cy,
						strokeWidth: blueprint.canvas.strokeWidth()*0.3,
						strokeDasharray: blueprint.tools.randominteger(9,18),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: p.cy - p.ry*1.1,
						y2: p.cy + p.ry*1.1,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.tools.randominteger(9,18),
						stroke: blueprint.canvas.strokeColor()
					}	
				},
			];
			return parts;
		},
	},


	/*
	sketch 10
	*/
	{
		getp: function( blueprint, j ) {
			//var rx = blueprint.canvas.min/2;
			var rx = blueprint.tools.randominteger(blueprint.canvas.min*.3, blueprint.canvas.min*0.48)
			//var ry = blueprint.canvas.min/2;
			var ry = rx;
			var cx = blueprint.canvas.width/2 ;
			var cy = blueprint.canvas.height/2;
			var r = rx;
			return { rx: Math.floor(rx), ry: Math.floor(ry), r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  
			[
				{ 
					element: "circle", type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: p.r,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.circlepathlength( p.rx ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "ellipse", type: "ellipse",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						rx: p.rx,
						ry: p.ry,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth: blueprint.canvas.strokeWidth(),
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.ellipsepathlength( p.rx, p.ry ) ),
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: "rect", type: "rect",
					score: {
						opacity: 1.0,
						x: 0,
						y: -blueprint.canvas.height / 2,
						width: blueprint.canvas.width,
						height: blueprint.canvas.height * 2,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						//strokeWidth: blueprint.canvas.strokeWidth()*3,
						strokeWidth: blueprint.canvas.width,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.rectanglepathlength( blueprint.canvas.width, blueprint.canvas.height ) ) / 3,
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".hline", type: "line",
					score: {
						opacity: 1.0,
						x1: 0,
						x2: blueprint.canvas.width,
						y1: p.cy * 3,
						y2: p.cy * 3,
						strokeWidth: blueprint.canvas.strokeWidth()/2,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.width )/3,
						stroke: blueprint.canvas.strokeColor()
					}
				},
				{
					element: ".vline", type: "line",
					score: {
						opacity: 1.0,
						x1: p.cx,
						x2: p.cx,
						y1: p.cy*2,
						y2: blueprint.canvas.height,
						strokeWidth: blueprint.canvas.strokeWidth()/2,
						strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.height )/3,
						stroke: blueprint.canvas.strokeColor()
					}	
				}
			];
			return parts;
		}
	},
],

circles : 
[
	/*
	sketch 0 big all directions
	*/
	{
		getp: function( blueprint, j ) {
			var cx = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.8);
			var cy = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.8);
			var r = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			return { cx: Math.floor(cx), cy: Math.floor(cy), r: Math.floor(r) }
		},		
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".circle"+r, type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						//r: (r===0) ? blueprint.tools.randominteger(blueprint.canvas.min*.05, blueprint.canvas.min*0.9) : blueprint.tools.randominteger(blueprint.canvas.min*.05, blueprint.canvas.min*1.2),
						r: blueprint.tools.randominteger(blueprint.canvas.min*.01, blueprint.canvas.min*1.2),
						//fillOpacity: (r===0) ? 1 : 0,
						//fillOpacity: [0,1,0,0,0,0,1,0,0][blueprint.tools.randominteger(0,8)],
						fillOpacity: 0,
						strokeOpacity: 1.0,
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeWidth:blueprint.canvas.strokeWidth()*3/blueprint.tools.randominteger(1,4),
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 1 ::: verticals
	*/
	{
		getp: function( blueprint, j ) {
			var cx = blueprint.canvas.width/2;
			var cy = blueprint.tools.randominteger(blueprint.canvas.height*.14, blueprint.canvas.height*.86);
			var r = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			return { cx: Math.floor(cx), cy: Math.floor(cy), r: Math.floor(r) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".circle"+r, type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: blueprint.tools.randominteger(blueprint.canvas.min*.03, blueprint.canvas.min*.8),
						//fillOpacity: (r===0) ? 1 : 0,
						fillOpacity: 0,
						strokeOpacity: 1.0,
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeWidth:blueprint.canvas.strokeWidth()*3/blueprint.tools.randominteger(1,6),
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 2 ::: horizontals
	*/
	{
		getp: function( blueprint, j ) {
			var cx = blueprint.tools.randominteger(blueprint.canvas.width*.14, blueprint.canvas.width*.86);
			var cy = blueprint.canvas.height/2;
			var r = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			return { cx: Math.floor(cx), cy: Math.floor(cy), r: Math.floor(r) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".circle"+r, type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: blueprint.tools.randominteger(blueprint.canvas.min*.04, blueprint.canvas.min*.6),
						//fillOpacity: (r===0) ? 1 : 0,
						fillOpacity: 0,
						strokeOpacity: 1.0,
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeWidth:blueprint.canvas.strokeWidth()*3/blueprint.tools.randominteger(1,6),
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 3 ::: centered
	*/
	{
		getp: function( blueprint, j ) {
			var cx = blueprint.canvas.width/2;
			var cy = blueprint.canvas.height/2;
			var r = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			return { cx: Math.floor(cx), cy: Math.floor(cy), r: Math.floor(r) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".circle"+r, type: "circle",
					score: {
						opacity: 1.0,
						cx: p.cx,
						cy: p.cy,
						r: blueprint.tools.randominteger(blueprint.canvas.min*.04, blueprint.canvas.min*.8),
						fillOpacity: 0,
						strokeOpacity: 1.0,
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeWidth:blueprint.canvas.strokeWidth()*3/blueprint.tools.randominteger(1,6),
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 4 small with fill / all directions
	*/
	{
		getp: function( blueprint, j ) {
			var cx = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.9);
			var cy = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.8);
			var r = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			return { cx: Math.floor(cx), cy: Math.floor(cy), r: Math.floor(r) }
		},		
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".circle"+r, type: "circle",
					score: {
						opacity: 1.0,
						cx: blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.9),
						cy: blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.8),
						//r: (r===0) ? blueprint.tools.randominteger(blueprint.canvas.min*.05, blueprint.canvas.min*0.9) : blueprint.tools.randominteger(blueprint.canvas.min*.05, blueprint.canvas.min*1.2),
						r: blueprint.tools.randominteger(blueprint.canvas.min*.01, blueprint.canvas.min*.2),
						//r: p.r,
						//fillOpacity:  [0,1,0,0,0,0,1,0,0,0][blueprint.tools.randominteger(0,8)],
						fillOpacity:  0,
						strokeOpacity: 1.0,
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeWidth:blueprint.canvas.strokeWidth()*3/blueprint.tools.randominteger(1,6),
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	
],

lines:
[
	/*
	sketch 0 with fill / all directions
	*/
	{
		getp: function( blueprint, j ) {
			var x = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.8);
			var y = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.4);
			var width = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			var height = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".rectangle"+r, type: "rect",
					score: {
						opacity: 1.0,
						x: (r%2===0) ? 0 : blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.8),
						y: (r%2===0) ? blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.4) : 0,
						width: (r%2===0) ? blueprint.canvas.width : p.width,
						height: (r%2===0) ? p.height : blueprint.canvas.height,
						fillOpacity: (r===0) ? 1 : 0,
						//fillOpacity: 0,
						strokeOpacity: 1.0,
						strokeWidth:blueprint.canvas.strokeWidth()/blueprint.tools.randominteger(1,4),
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						////strokeDasharray: blueprint.canvas.strokeDasharray( blueprint.canvas.min*3 ),
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 1 ::: no fill / all directions
	*/
	{
		getp: function( blueprint, j ) {
			var x = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.8);
			var y = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.4);;
			var width = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			var height = blueprint.tools.randominteger(blueprint.canvas.min*.1, blueprint.canvas.min*.4);
			return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".rectangle"+r, type: "rect",
					score: {
						opacity: 1.0,
						x: (r%2===0) ? 0 : p.x,
						y: (r%2===0) ? p.y : 0,
						width: (r%2===0) ? blueprint.canvas.width : p.width,
						height: (r%2===0) ? p.height : blueprint.canvas.height,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeWidth:blueprint.canvas.strokeWidth()*2/blueprint.tools.randominteger(1,6),
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 2 ::: horizontals
	*/
	{
		getp: function( blueprint, j ) {
			var x = 10;
			var y = blueprint.tools.randominteger(blueprint.canvas.height*.01, blueprint.canvas.height*.5);
			var width = blueprint.canvas.width - 20;
			var height = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.6);
			return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".rectangle"+r, type: "rect",
					score: {
						opacity: 1.0,
						x: p.x,
						y: blueprint.tools.randominteger(blueprint.canvas.height*.01, blueprint.canvas.height*.5),
						width: p.width,
						height: blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.6),
						fillOpacity: 0,
						strokeOpacity: 1.0,
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeWidth:blueprint.canvas.strokeWidth()*3/blueprint.tools.randominteger(1,8),
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 3 ::: horizontals ::: centered
	*/
	{
		getp: function( blueprint, j ) {
			var x = 10;
			var y = blueprint.tools.randominteger(blueprint.canvas.height*.01, blueprint.canvas.height*.5);
			var width = blueprint.canvas.width-20;
			var height = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.8);
			return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".rectangle"+r, type: "rect",
					score: {
						opacity: 1.0,
						x: p.x,
						y: (blueprint.canvas.height-p.height)/2,//p.y,
						width: p.width,
						height: blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.8),
						fillOpacity: 0,
						strokeOpacity: 1.0,
						strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 4 ::: horizontals ::: with fill
	*/
	{
		getp: function( blueprint, j ) {
			var x = 10;
			var y = blueprint.tools.randominteger(blueprint.canvas.height*.01, blueprint.canvas.height*.5);
			var width = blueprint.canvas.width - 20;
			var height = blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.5);
			return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".rectangle"+r, type: "rect",
					score: {
						opacity: 1.0,
						x: p.x,
						y: p.y,
						width: p.width,
						height: blueprint.tools.randominteger(blueprint.canvas.height*.1, blueprint.canvas.height*.5),
						fillOpacity: (r===0) ? 1 : 0,
						strokeOpacity: 1.0,
						strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 5 ::: verticals
	*/
	{
		getp: function( blueprint, j ) {
			var x = blueprint.tools.randominteger(blueprint.canvas.width*.01, blueprint.canvas.width*.8);
			var y = 10;
			var width = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.4);
			var height = blueprint.canvas.height-20;
			return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".rectangle"+r, type: "rect",
					score: {
						opacity: 1.0,
						x: blueprint.tools.randominteger(blueprint.canvas.width*.01, blueprint.canvas.width*.8),
						y: 10,
						width: blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.5),
						height: p.height,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth:blueprint.canvas.strokeWidth()*1.4/blueprint.tools.randominteger(1,6),
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 6 ::: verticals centered
	*/
	{
		getp: function( blueprint, j ) {
			var x = blueprint.tools.randominteger(blueprint.canvas.width*.01, blueprint.canvas.width*.8);
			var y = 10;
			var width = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.9);
			var height = blueprint.canvas.height-20;
			return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".rectangle"+r, type: "rect",
					score: {
						opacity: 1.0,
						x: (blueprint.canvas.width-p.width)/2,
						y: 10,
						width: p.width,
						height: p.height,
						fillOpacity: 0.0,
						strokeOpacity: 1.0,
						strokeWidth:blueprint.canvas.strokeWidth()*1.4/blueprint.tools.randominteger(1,4),
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	/*
	sketch 7 ::: verticals ::: with fill
	*/
	{
		getp: function( blueprint, j ) {
			var x = blueprint.tools.randominteger(blueprint.canvas.width*.01, blueprint.canvas.width*.8);
			var y = 10;
			var width = blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.4);
			var height = blueprint.canvas.height-20;
			return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
		},
		getsketch: function( blueprint, j, p ) {
			var parts =  [];
			[0,1,2,3].forEach(function(r) {
				parts.push({ 
					element: ".rectangle"+r, type: "rect",
					score: {
						opacity: 1.0,
						x: blueprint.tools.randominteger(blueprint.canvas.width*.01, blueprint.canvas.width*.8),
						y: 10,
						width: blueprint.tools.randominteger(blueprint.canvas.width*.1, blueprint.canvas.width*.4),
						height: p.height,
						fillOpacity: (r===0) ? 1 : 0,
						strokeOpacity: 1.0,
						strokeWidth:blueprint.canvas.strokeWidth()*1.4/blueprint.tools.randominteger(1,4),
						//strokeWidth: (r===0) ? blueprint.canvas.strokeWidth()/2 : blueprint.canvas.strokeWidth()/r,
						strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
						stroke: blueprint.canvas.strokeColor(),
						fill: blueprint.canvas.strokeColor()
					}
				});
			});
			return parts;
		}
	},
	
]
};
}