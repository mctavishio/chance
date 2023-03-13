function buildtools( blueprint ) {
	return  {
		copyLogNode: function( node ) {
			var copy = node.cloneNode(true);
			//copy.setAttributeNS(null, "xmlns","http://www.w3.org/2000/svg");
			blueprint.tools.logmsg('<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg>' + copy.outerHTML);
			var features = "menubar=no,location=no,resizable=yes,scrollbars=yes,title=no,status=no, left=0,right=0,width="+blueprint.canvas.width+",height="+blueprint.canvas.height;
			var w = window.open("", "clip board", features);
			w.document.write('<h1>saved svg image</h1>' + copy.outerHTML + '<h1>svg code</h1><p>copy &amp; paste to file</p><p><code>' + blueprint.tools.safetags('<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg>'+copy.outerHTML)+ '</code></p><hr/><hr/><hr/>');
			w.document.title = 'svg clipboard';
		},
		randominteger: function(min, max) {
			return Math.floor( min + Math.random()*(max-min));
		},
		mod: function(n, m) {
			return ((n%m) + m)%m;
		},
		safetags: function(str) {
		    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/&lt;/g,'<br/>&lt;');
		},
		circlepathlength: function(r) { return Math.PI * 2* r },
		ellipsepathlength: function(rx, ry) { return Math.PI * 2* Math.sqrt( (rx*rx + ry*ry)/2) },
		rectanglepathlength: function(rx, ry) { return rx*2 + ry*2 },
		logmsg: function(msg) {
			console.log("### ::: " + msg);
		},
		logerror: function(error) {
			try { console.log("rusty error ... " + error); }
			catch(err) {}
		},
		logcontext: function( blueprint ) {
			blueprint.tools.logmsg("blueprint.phase = " + blueprint.phase);
			blueprint.tools.logmsg("blueprint.sketchset = " + blueprint.sketchset);
			blueprint.tools.logmsg("number of sketches = " + blueprint.canvas.sketches.length);
			blueprint.tools.logmsg("blueprint.quartet = " + blueprint.quartet);
			blueprint.tools.logmsg("blueprint.number = " + blueprint.number);
			blueprint.tools.logmsg("blueprint.sketch = " + blueprint.sketch);
			blueprint.tools.logmsg("current sketch = " + blueprint.canvas.sketch);
			blueprint.tools.logmsg("dt = " + blueprint.dt);
		},
	}
};