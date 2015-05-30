(function(){
	var express = require('express');
	var db = require('./db');
	var bodyParser = require('body-parser');
	var io = require('socket.io');
	var core = express();

	var server = core.listen(8002, function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log('Server started on', host + ':' + port);
	});

	var onlineUsers = {};
	io = io(server);

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

	core.use( bodyParser.json() );       // to support JSON-encoded bodies
	core.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	  extended: true
	})); 

	io.on('connection', function(socket, user) {
		socket.on('user', function(data){
			onlineUsers[data.email] = true;
			user = data.email;
			console.log(user + ' connected');
		});

		socket.on('disconnect', function(){
			delete onlineUsers[user];
			console.log(user + ' disconnected');
		});
	});
	/*
	core.all('*', function (req, res, next) {
	  console.log('Accessing', req.headers, req.body, req.params);
	  next(); // pass control to the next handler
	});
	*/
	var listsAPI = require('./api/lists')(core, db);
	var userAPI = require('./api/user')(core, db);
	var todoAPI = require('./api/todo')(core, db);
})();
