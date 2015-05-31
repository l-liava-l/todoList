module.exports = function(core, db, users){
	return socketAPI;

	function socketAPI(socket){

	}

	

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
