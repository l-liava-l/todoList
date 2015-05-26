(function(){
	module.exports = init;
	
	function init(core, db){
		core.post('/api/lists/create', function (req, res){
			if(req.body.email && req.body.title){ 
				insert(Date.now()); 
			} 
			else{
				res.send(false)
				return false
			}

			function insert(listId){
				var insertQuery = "INSERT INTO `lists`(id, title) " 
							 + " VALUES ('"+listId+"','"+req.body.title +"');";

				db.query(insertQuery, function(err, rows, fields) {
				  if(err){throw err;}
				  addUser(listId, req.body.email, function(){
				  	res.send(true);
				  });
				});
			}
		});

		core.post('/api/lists/get', function (req, res){
			if(req.body.email){ 
				insert(Date.now()); 
			} else{res.send(false)}

			function insert(listId){
				var getQuery = "SELECT * FROM `group` WHERE email='"+req.body.email+"';";

				db.query(getQuery, get);

				function get(err, rows, fields){
					if(err){throw err;}

					var query = "SELECT * FROM `lists` "

					rows.forEach(function(item, id){
						query += (id ? " OR" : "WHERE ") + " id='"+item.listID+"'";
					});

					db.query(query + ';', function(err, rows, fields) {
					  if(err){throw err;}
					  res.send(rows);
					});
				}
			}
		});

		function addUser(listId, email, callback){
			var insertQuery = "INSERT INTO `group`(listId, email) " 
							 + " VALUES ('"+listId+"','"+email+"');";

			db.query(insertQuery, function(err, rows, fields) {
			  if(err){throw err;}
			  console.log('group added');
			  callback();
			});
		}
	}
})();


			//db.query("SELECT * FROM users WHERE email='" + params.body.email + "';", on);