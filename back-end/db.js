(function(){
	var mysql = require('mysql');
	
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: ''
	});

	connection.connect();

	module.exports.db = connection;
})();



