(function(){
	module.exports = init;
	
	function init(core, db){
		core.post('/api/lists/create', function (req, res){
			if(req.body.email && req.body.title){ 
				insert(Date.now()); 
			} else{res.send(false)}

			function insert(listId){
				var insertQuery = "INSERT INTO lists(id, title) " 
							 + " VALUES ('"+listId+"','"+req.body.title +"');";

				db.query(insertQuery, function(err, rows, fields) {
				  if(err){throw err;}
				  addUser(listId, req.body.email);
				});
			}
		});

		function addUser(listId, email){
			var insertQuery = "INSERT INTO `group`(listId, email) " 
							 + " VALUES ('"+listId+"','"+email+"');";

			db.query(insertQuery, function(err, rows, fields) {
			  if(err){throw err;}
			  console.log('group added');
			});
		}
	}
})();


			//db.query("SELECT * FROM users WHERE email='" + params.body.email + "';", on);