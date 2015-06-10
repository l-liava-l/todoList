module.exports = function(core, db){
	var users = db.collection('users');

	core.post('/api/user/getByMask', function (req, res){
		if(!req.body){ return res.send(false) }
		users.find({_id: new RegExp(req.body.mask + '.+')}).limit(8).toArray(function(err, arr){
			res.send(arr);
		});
	});

	core.post('/api/user/update', function (req, res){
		if(!req.body){ return res.send(false) }

		users.update({_id: req.body.email}, {$set: req.body}, {upsert: true}, function(err, cursor){
			console.log(req.body.email + ' - updated')
			res.send(true);
		});
	});
} 




		/*
		var create = {
			create: {
				type: 'json0', 
				data: user
			}
		};

		db.submit('users', user.email, , function(err, version) {
		  	console.log('err', err);
		});
		db.fetch('users', new RegExp(req.body.mask + '.+'), function(err, snapshot) {
			console.log('===========================');
			console.log(snapshot);
			res.send(snapshot.data);
		});


		db.fetch('users', user.email, function(err, snapshot) {
			db.submit('users', user.email, snapshot.data ? {op: user} : create, function(err) {
  				err ? console.log(err) : null;
			});
		});
		db.submit('users', user.email, , function(err, version) {
		  	console.log('err', err);
		});
			//db.users.upsert({email: user.email}, {$set: user});
		*/
		/*
	  	db.query("SELECT * FROM users WHERE email = '" + user.email +"';", checkExist)

	  	function checkExist(err, rows, fields){
			rows.length ? update("'" + (rows[0].id) + "'") : insert();
		}

		function insert(){
			var insertQuery = "INSERT INTO users(email, givenName, familyName, imageUrl) VALUES ('" +
				 			    user.email+"','"+ 
							    user.givenName +"','"+
						 		user.familyName+"','"+ 
						 		user.imageUrl+"');"

			db.query(insertQuery, function(err, rows, fields) {
			   console.log('New user added.');
			});
		}

		function update(){
			var query =	"UPDATE users SET (" +
					"givenName = '" + user.givenName + "' AND " +
					"familyName = '" + user.familyName + "' AND " +
					"imageUrl = '" + user.imageUrl + "') WHERE email = '"+user.email+"';";

			db.query(query, function(err, rows, fields){
			  console.log('User profile updated.');
			});
		}
		*/