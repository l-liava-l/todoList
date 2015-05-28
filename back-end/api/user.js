(function(){
	module.exports = init;
	
	function init(core, db){

		core.post('/api/user/update', function (req, res){

			var findQuery = "SELECT * FROM users WHERE email = '" + req.body.email +"';";
		
			db.query(findQuery, function(err, rows, fields) {
			  if(err){ throw err; }
			  rows.length ? update("'" + (rows[0].id) + "'") : insert();
			});

			function insert(){
				var insertQuery = "INSERT INTO users(email, givenName, familyName, imageUrl)" 
							 + "VALUES ('" +
							 		req.body.email+"','"+ 
							 		req.body.givenName +"','"+
							 		req.body.familyName+"','"+ 
							 		req.body.imageUrl+"');";

				db.query(insertQuery, function(err, rows, fields) {
				  if (err){throw err;}
				  console.log('User inserted successful.');
				});
			}

			function update(id){

				var insertQueries = [
					"UPDATE users SET givenName = '" + req.body.givenName + "' WHERE email = '"+req.body.email+"';",
					"UPDATE users SET familyName = '" + req.body.familyName + "' WHERE email = '"+req.body.email+"';",
					"UPDATE users SET imageUrl = '" + req.body.imageUrl + "' WHERE email = '"+req.body.email+"';"
				];

				for(var key in insertQueries){query(insertQueries[key])}

				function query(q){
					db.query(q, function(err, rows, fields) {
					  if (err){throw err;}
					  console.log('User updated');
					});
				}
			}
		});

		core.post('/api/user/getByMask', function (req, res){
			var findQuery = "SELECT * FROM users WHERE email LIKE '" + req.body.mask +"%';";
		
			db.query(findQuery, function(err, rows, fields) {
			  if(err){ throw err; }
			  res.send(rows);
			});
		});
	}
})();
