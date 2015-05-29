(function(){
	module.exports = init;
	
	function init(core, db){
		core.post('/api/lists/create', function (req, res){
			req.body.email && req.body.title ? insert(Date.now()) : res.send(false);

			function insert(listId){
				var insertQuery = "INSERT INTO `lists`(id, title) " 
							 + " VALUES ('"+listId+"','"+req.body.title +"');";

				db.query(insertQuery, function(err, rows, fields) {
				  if(err){throw err;}
				  addUser(listId, req.body.email, function(){
				  	res.send({
				  		id: listId,
				  		title: req.body.title
				  	});
				  });
				});
			}
		});

		core.post('/api/lists/get', function (req, res){
			req.body.email ? get() : res.send(false);

			function get(){
				var getQuery = "SELECT * FROM `group` WHERE email='"+req.body.email+"';";

				db.query(getQuery, getLists);

				function getLists(err, rows, fields){
					if(err){throw err;}

					var query = "SELECT lists.*, users.* FROM `lists`, `group`, `users`"

					rows.forEach(function(item, id){
						query += (id ? " OR " : " WHERE ") + "(`lists`.id='"+item.listID+"' AND `lists`.id = `group`.listID AND `group`.email = `users`.email)";
					});

					db.query(query + ';', function(err, rows, fields) {
						if(err){throw err;}
						var lists = [];

						rows.forEach(function(item){
							var list = serachById(item.id);
							if(!list){
								lists.push(genNewList(item))
								return false;
							}
							
							list.users.push(genNewUsrObj(item));

						});

						res.send(lists);

						function genNewList(row){
							return {
								title: row.title,
								id: row.id,
								users: [genNewUsrObj(row)]
							}
						}

						function genNewUsrObj(row){
							return {
								givenName: row.givenName,
								familyName: row.familyName,
								imageUrl: row.imageUrl,
								email: row.email
							}
						}

						function serachById(id){
							var output; 
							lists.forEach(function(item){
								if(item.id === id){
									output = item;
								}
							});

							return output;
						}
					});
				}
			}
		});

		core.post('/api/lists/getUsers', function (req, res){
			req.body.listId ? res.send(true) : res.send(false);
		});

		core.post('/api/lists/addUser', function (req, res){
			if(req.body.email && req.body.listId){
				addUser(req.body.listId, req.body.email, function(){
					res.send(true)
				});
				return false;
			}

			res.send(false)
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