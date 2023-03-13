// required packages
// =============================================================================
//important frp node example ::: http://blog.carbonfive.com/2014/09/23/bacon-js-node-js-mongodb-functional-reactive-programming-on-the-server/
var express     		= require("express");
var app         		= express();
var bodyparser  	= require("body-parser");
var http        		= require("http");
var server     		= http.createServer(app);
var path        		= require("path");
var ejs         		= require("ejs");

tools     		= require("./buildtools")(  );
sketchsets     		= require("./buildsketchsets_chance")(  );
pdfkit 		= require("pdfkit");

var clientnumber	= 0;
var subscriptions	= [];
var wsurl		= "default";
var videourl		= "none";

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var port = process.env.PORT || 8080;    // set our port

// define routes
// =============================================================================
var router = express.Router();        // http://expressjs.com/guide/routing.html
app.use(function (req, res, next) {
	res.set("X-Powered-By", "data poets");
	next();
});
app.use('/public', express.static(__dirname + '/public'));

// middleware to use for all requests
router.use( function(req, res, next) {
  	// do logging
  	tools.logmsg("new login :: time = :  " + new Date().toString());
  	next();
  });

var createid = function() {
	return "id" + clientnumber + "t" + new Date().getTime();
}
var randominteger = function(min, max) {
	return Math.floor( min + Math.random()*(max-min));
}
var outputparameters = {
	_id: function( req, reqp ) { return createid() },
	timestamp: function( req, reqp ) { return Date.now() },
	ipaddress: function( req, reqp ) { return req.ip },
	useragent: function( req, reqp ) { return req.header("user-agent") },
	clientnumber: function( req, reqp ) { return clientnumber },
	notes: function( req, reqp ) { return [  ] },
	offline: function( req, reqp ) { return ( reqp.offline ? reqp.offline : true ) },
	role: function( req, reqp ) { return ( reqp.role ? reqp.role :  ( /mobile/i.test( req.header("user-agent") ) ? "mobile" : "desktop" ) ) },
	phase: function( req, reqp ) { return ( reqp.phase ? reqp.phase : "motion" ) },
	purpose: function( req, reqp ) { return ( reqp.purpose ? reqp.purpose : "default" ) },
	quartet: function( req, reqp ) { return ( reqp.quartet ? reqp.quartet : randominteger(0,7) ) },
	number: function( req, reqp ) { return ( reqp.number ? reqp.number : randominteger(0,3) ) },
	rootcolors: function( req, reqp ) { 
		var rootcolors = ["ffcc00","9a0000"];
		if( reqp.rootcolors ) {
			if( Array.isArray(reqp.rootcolors) ) {
				try { rootcolors = reqp.rootcolors } catch(e) {};
			}
			else {
				try { rootcolors = reqp.rootcolors.split(","); } catch(e) {};
			}
		}
		return rootcolors;
	},
	width: function( req, reqp ) { return ( reqp.width ? reqp.width : 0 ) },
	height: function( req, reqp ) { return ( reqp.height ? reqp.height : 0 ) },
	rootpitch: function( req, reqp ) { return ( reqp.rootpitch ? reqp.rootpitch : 256 ) },
	sketchset: function( req, reqp ) { return ( reqp.sketchset ? reqp.sketchset : "core" ) }, // lines || circles || core
	sketch: function( req, reqp ) { return ( reqp.sketch ? reqp.sketch : "all" ) },
	dt: function( req, reqp ) { return ( reqp.dt ? reqp.dt : 2 ) },
	sketchset: function( req, reqp ) { return ( reqp.sketchset ? reqp.sketchset : "core" ) },
	gain: function( req, reqp ) { return ( reqp.gain ? reqp.gain : 0.3 ) },
	clipping: function( req, reqp ) { return ( reqp.clipping ? reqp.clipping : "box" ) },
	ndrawings: function( req, reqp ) { return ( reqp.ndrawings ? reqp.ndrawings : ( (/mobile/i.test( req.header("user-agent") ) || reqp.role === "mobile" )  ? 2 : 4 ) ) },
	nframes: function( req, reqp ) { return ( ( reqp.phase === "book" ||  reqp.phase === "pdfbook") ? 88 : ( reqp.nframes ? reqp.nframes : 1 ) ) },
	fullurl: function( req, reqp ) { return req.protocol + '://' + req.get('host')},
};
var inputparameters = {
	//_id: function( req, reqp ) { return createid() },
	//timestamp: function( req, reqp ) { return Date.now() },
	//ipaddress: function( req, reqp ) { return req.ip },
	//useragent: function( req, reqp ) { return req.header("user-agent") },
	fullurl: function( req, reqp ) { return req.protocol + '://' + req.get('host')},
	numsketches: function( req, reqp ) { return sketchsets.core.length },
}
router.route("/chance/input")
.get(function(req, res) {;
	++clientnumber;
	tools.logmsg("client ::: " + clientnumber);
	tools.logmsg("c H a N c e :::  ||| input parameters");
	var blueprint = {};
	
	Object.keys(inputparameters).forEach(function(key) {
		tools.logmsg("inputparameters key : " +  key + " = " + inputparameters[key](req, req.body) );
		blueprint[key] = inputparameters[key](req, req.query);
	});
	res.render("input.ejs", { blueprint : blueprint });
});
router.route("/chance")
	.get(function(req, res) {;
		++clientnumber;
		tools.logmsg("client ::: " + clientnumber);
		var blueprint = {};
		Object.keys(outputparameters).forEach(function(key) {
			blueprint[key] = outputparameters[key](req, req.query);
			tools.logmsg("outputparameters key : " +  key + " = " + outputparameters[key](req, req.body) );
		});

		tools.logmsg("c H a N c e :::  ||| blueprint = " + JSON.stringify( blueprint ));
		if(blueprint.phase === "pdfbook") {
			tools.logmsg("c H a N c e :::  ||| pdf book");
			blueprint.stream = res;
			blueprint.sketchsets = sketchsets;
			blueprint.tools = tools;
			blueprint.pdfkit = pdfkit;
			blueprint.canvas = require("./buildcanvas")( blueprint );
			blueprint.canvas.render( blueprint );
		}
		else {
			res.render("chance.ejs", { blueprint: blueprint });
		}
	})
	.post(function(req, res) {
		++clientnumber;
		tools.logmsg("in POST ::: client ::: " + clientnumber);
		var blueprint = {};
		Object.keys(outputparameters).forEach(function(key) {
			blueprint[key] = outputparameters[key](req, req.body);
		});
		tools.logmsg("c H a N c e :::  ||| blueprint = " + JSON.stringify( blueprint ));

		if(blueprint.phase === "pdfbook") {
			tools.logmsg("c H a N c e :::  ||| pdf book");
			blueprint.stream = res;
			blueprint.sketchsets = sketchsets;
			blueprint.tools = tools;
			blueprint.pdfkit = pdfkit;
			blueprint.canvas = require("./buildcanvas")( blueprint );
			blueprint.canvas.render( blueprint );
		}
		else {
			res.render("chance.ejs", { blueprint: blueprint });
		}
	});
router.route("/")
	.get(function(req, res) {;
		++clientnumber;
		tools.logmsg("client ::: " + clientnumber);
		var blueprint = {};
		Object.keys(outputparameters).forEach(function(key) {
			blueprint[key] = outputparameters[key](req, req.query);
			tools.logmsg("outputparameters key : " +  key + " = " + outputparameters[key](req, req.body) );
		});

		tools.logmsg("c H a N c e :::  ||| blueprint = " + JSON.stringify( blueprint ));
		if(blueprint.phase === "pdfbook") {
			tools.logmsg("c H a N c e :::  ||| pdf book");
			blueprint.stream = res;
			blueprint.sketchsets = sketchsets;
			blueprint.tools = tools;
			blueprint.pdfkit = pdfkit;
			blueprint.canvas = require("./buildcanvas")( blueprint );
			blueprint.canvas.render( blueprint );
		}
		else {
			res.render("chance.ejs", { blueprint: blueprint });
		}
	})
	.post(function(req, res) {
		++clientnumber;
		tools.logmsg("in POST ::: client ::: " + clientnumber);
		var blueprint = {};
		Object.keys(outputparameters).forEach(function(key) {
			blueprint[key] = outputparameters[key](req, req.body);
		});
		tools.logmsg("c H a N c e :::  ||| blueprint = " + JSON.stringify( blueprint ));

		if(blueprint.phase === "pdfbook") {
			tools.logmsg("c H a N c e :::  ||| pdf book");
			blueprint.stream = res;
			blueprint.sketchsets = sketchsets;
			blueprint.tools = tools;
			blueprint.pdfkit = pdfkit;
			blueprint.canvas = require("./buildcanvas")( blueprint );
			blueprint.canvas.render( blueprint );
		}
		else {
			res.render("chance.ejs", { blueprint: blueprint });
		}
	});


// register routes -------------------------------
// all of our routes will be prefixed with /
app.use("/", router);

// start the server
// =============================================================================
server.listen(port);
tools.logmsg("data poets listening on port " + port);

// start the websocket
// =============================================================================

//https://npmjs.org/package/ws
var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({server: server});

wss.broadcast = function(data) {
	tools.logmsg('broadcast to: num clients = ' + this.clients.length + " message = " + data);
	for(var i in this.clients) {
		try {
			this.clients[i].send(data);
		}
		catch(err) {
			tools.logerror("error broadcasting message : " + i + "error = " + err);
		}
	}
};
wss.broadcasttosubscribers = function(message) {
	for (var key in subscribers) {
		if (subscribers.hasOwnProperty(key)) {
			if(message.hashtags in subscribers[key].hashtags) {

			}
		}
	}
};
wss.on('connection', function(ws) {
	var message = {};
	message.data = "client # " + number + " ::: connected to server  . . . ";
	message.type = "text";
	message.hashtags = "machine";
	message.time = new Date();
	message._id = "graffitiid";
	message.clientnumber = "8";
	//subscriptions[jsonData._id] = {hashtags: ["pigeon","cassiel"], ws:ws};
	try {
		//ws.send(JSON.stringify(message));
		tools.logmsg("sent msg " + JSON.stringify(message));

		wss.broadcast(JSON.stringify(message));
	}
	catch(err) {
		tools.logerror("error sending message : " + err);
	}
	tools.logmsg("started client interval");

	ws.on("message", function(message) {
		try {
			tools.logmsg("received message :: " + message);
			var jsonData = JSON.parse(message);
			tools.logmsg(jsonData.type);
			if(jsonData.type === "text") {
				database.savenotetodb(jsonData._id, jsonData.data);
				wss.broadcast(message);
			}
			if(jsonData.type === "data") {
				wss.broadcast(message);
			}
			else if(jsonData.type === "subscription") {
				subscriptions[jsonData._id] = {hashtags: jsonData.data, ws:ws};
			}
		}
		catch(err) { tools.logerror("error in onmessage : msg = " + message + "error = " + err) }
	});
	ws.on("close", function() {
		tools.logmsg("stopping client interval :: " + JSON.stringify(subscriptions));
		//if(subscriptions.hasOwnProperty(jsonData._id)) { delete subscriptions[jsonData._id]; }
	});
});


