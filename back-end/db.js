(function(){
	var mysql = require('mysql');
	
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: ''
	});

	connection.connect();

	connection.query("USE todo;", function(err){
		if (err) throw err;
		console.log('db connection success');
	});

	module.exports = connection;
})();



