var dbUrl = 'mongodb://localhost:27017/todoList';

var db = require('mongodb')
	.MongoClient.connect(dbUrl, function(err, db) {
		module.exports.db = db;
	});

module.exports.livedb = require('livedb')
	.client(require('livedb-mongo')(dbUrl));

