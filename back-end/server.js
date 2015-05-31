(function(){
	var express = require('express');
	var core = express();
	var server = createServer();
	var io = require('socket.io')(server);
	var bodyParser = require('body-parser');
	var dbUrl = 'mongodb://localhost:27017/todoList'
	var livedb = require('livedb').client(require('livedb-mongo')(dbUrl));
	var mongodb = require('mongodb').connect(dbUrl, function(err, db){
		var usersAPI = new require('./api/users')(core, db);
		var listsAPI = new require('./api/lists')(core, db, livedb);

		io.on('connection', function(socket){
			usersAPI(socket);
			listsAPI(socket);
			//todoAPI(socket);
		});
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

	function createServer(){
		return core.listen(8002, function () {
			var host = server.address().address;
			var port = server.address().port;
			console.log('Server started on', host + ':' + port);
		});
	}
})();
