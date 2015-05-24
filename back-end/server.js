(function(){
	var express = require('express')();
	var db = require('./db');
	
	var server = express.listen(8002, function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log('Server started on', host + ':' + port);
	});

	var listAPI = require('./api/list')(express, db);
})();
