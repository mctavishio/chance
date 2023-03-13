module.exports = function( ) {
	return  {
		randominteger: function(min, max) {
			return Math.floor( min + Math.random()*(max-min));
		},
		mod: function(n, m) {
			return ((n%m) + m)%m;
		},
		safetags: function(str) {
		    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/&lt;/g,'<br/>&lt;');
		},
		logmsg: function(msg) {
			//console.log("### ::: " + msg);
		},
		logerror: function(error) {
			try { console.log("rusty error ... " + error); }
			catch(err) {}
		},
	}
};