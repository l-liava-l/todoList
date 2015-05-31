(function(){
	var express = require('express');
	var core = express();
	var server = createServer();
	var io = require('socket.io')(server);
	var livedb = require('livedb');
	var liveDbMongo = require('livedb-mongo');
	var bodyParser = require('body-parser');
	var db = livedb.client(liveDbMongo('mongodb://localhost:27017'));
	
	io.on('connection', function(socket){
		usersAPI(socket);
		//listAPI(socket);
		//todoAPI(socket);
	});

	core.use(bodyParser.json());     
	core.use(bodyParser.urlencoded({
	  extended: true
	})); 

	core.use(function(req, res, next) {
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

	var usersAPI = new require('./api/users')(core, db);


	function createServer(){
		return core.listen(8002, function () {
			var host = server.address().address;
			var port = server.address().port;
			console.log('Server started on', host + ':' + port);
		});
	}
	/*
	var db = require('./db');
	
	var onlineUsers = {};

	var Swarm = require('swarm');

	var levelStorage = new Swarm.LevelStorage(0, {db: 'todoDB'});

	var Mouse = Swarm.Model.extend('Mouse', {
        defaults: {
            name: 'Mickey',
            x: 0,
            y: 0
        }
    });

	var swarmHost = new Swarm.Host('swarm~nodejs', 0, levelStorage);

	
	core.use(function(req, res, next) {
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

	var listAPI = new require('./api/lists')(core, db, userAPI.users);
	var todoAPI = new require('./api/todo')(core, db, userAPI.users);

	core.use(bodyParser.json());     
	core.use(bodyParser.urlencoded({
	  extended: true
	})); 
	
	
	*/
})();
