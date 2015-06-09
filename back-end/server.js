var bodyParser = require('body-parser');
var app = require('express')();
var mongodb = require('mongodb');

var server = createServer();
var dbUrl = 'mongodb://localhost:27017/todoList'

mongodb.connect(dbUrl, mongoConnect);  

//== middlewares
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(function(req, res, next) {
	var headers = {
		'Cache-Control' : 'max-age:120'  
	};

	if(req.headers.origin){			
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
		res.setHeader('Access-Control-Allow-Methods',  'GET, POST, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, X-PINGOTHER');
		res.setHeader('Access-Control-Max-Age', 86400);
	}

	next();
});

app.use(bodyParser.json());  


//== declarations
function mongoConnect(err, db){
	if(err){ console.log(err) }
	var usersAPI = new require('./api/users')(app, db);
	var listsAPI = new require('./api/lists')(app, db);
}


function createServer(){
	return app.listen(8002, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Server started on', host + ':' + port);
	});
}


/*
(function(){
	
	
	var bodyParser = require('body-parser');
	var core = require('express')();
	var server = createServer();
	var dbUrl = 'mongodb://localhost:27017/todoList'
	
	core.use(bodyParser.json());     
	core.use(bodyParser.urlencoded({
	  extended: true
	})); 

	


var http = require('http');
var ws_lib = require('ws');
var Swarm = require('swarm');

var BackendModel = Swarm.Model.extend("Editor", {
    defaults: {
        cursors: [],
        content: ""
    }
});

var storage = new Swarm.LevelStorage('lists', {
    path: '.lists',
    db: require('leveldown')
});

storage.open(function(err){
    if(err){
        console.log(err);
    } 
});

var swarmHost = new Swarm.Host('swarm~nodejs', 0, storage);



var httpServer = http.createServer();
httpServer.listen(8002, function (err) {
    if (err) {
        console.warn('Can\'t start server. Error: ', err, err.stack);
        return;
    }
    console.log('Swarm server started at port 8008');
});

var usersAPI = new require('./api/users')(core, db);

var wsServer = new ws_lib.Server({ server: httpServer });

wsServer.on('connection', function (ws) {
    console.log('new incoming WebSocket connection');

    swarmHost.accept(new Swarm.EinarosWSStream(ws), { delay: 50 });
});



	

	
})();

*/