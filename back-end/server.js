(function(){
	var express = require('express');
	var db = require('./db');
	var core = express();
	var server = createServer();
	var io = require('socket.io')(server);
	var bodyParser = require('body-parser');
	var onlineUsers = {};

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

	var userAPI = new require('./api/user')(core, db);
	var listAPI = new require('./api/lists')(core, db, userAPI.users);
	var todoAPI = new require('./api/todo')(core, db, userAPI.users);

	core.use(bodyParser.json());     
	core.use(bodyParser.urlencoded({
	  extended: true
	})); 

	io.on('connection', function(socket){
		userAPI(socket);
		listAPI(socket);
		todoAPI(socket);
	});

	function createServer(){
		return core.listen(8002, function () {
			var host = server.address().address;
			var port = server.address().port;
			console.log('Server started on', host + ':' + port);
		});
	}
})();
