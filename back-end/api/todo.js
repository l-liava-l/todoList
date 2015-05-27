(function(){
	module.exports = init;
	
	function init(core, db){
		core.post('/api/todo/create', function (req, res){
			req.body.text && req.body.listID ? insert() : res.send(false);

			function insert(){
				var insertQuery = "INSERT INTO `todo`(id, text, listId, status) " 
							 + " VALUES ('"+Date.now()+"','"+req.body.text+"','"+req.body.listID + "', 'new');";

				db.query(insertQuery, function(err, rows, fields) {
				  if(err){throw err;}
				  res.send(true);
				});
			}
		});

		core.post('/api/todo/get/listed', function (req, res){
			req.body.listID ? get() : res.send(false);

			function get(){
				var getQuery = "SELECT * FROM `todo` WHERE listId='"+req.body.listID+"';";

				db.query(getQuery, get);

				function get(err, rows, fields){
					if(err){throw err;}
					res.send(rows);
				}
			}
		});

		core.post('/api/todo/set/status', function (req, res){
			req.body.id && req.body.status ? get() : res.send(false);

			function get(){
				var getQuery = "UPDATE `todo` SET status='"+req.body.status+"' WHERE id='"+req.body.id+"';";

				db.query(getQuery, get);

				function get(err, rows, fields){
					if(err){throw err;}
					res.send(true);
				}
			}
		});
	}
})();


			//db.query("SELECT * FROM users WHERE email='" + params.body.email + "';", on);