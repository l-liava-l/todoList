module.exports = function(core, db){
	var onlineUsers = {}
	var users = db.collection('users');

	core.post('/api/user/getByMask', function (req, res){
		if(!req.body){ return res.send(false) }
		users.find({_id: new RegExp(req.body.mask + '.+')}).limit(8).toArray(function(err, arr){
			console.log(arr);
		});
	});

	return socketAPI;

	function socketAPI(socket, user){
		socket.on('api:user:update', function(data){
			console.log(data.email + ' connected');
			onlineUsers[data.email] = socket;
			user = data.email;
			updateUser(data);
		});

		socket.on('disconnect', function(){
			console.log(user + ' disconnected');
			delete onlineUsers[user];
		});
	}

	function updateUser(user){
		users.update({_id: user.email}, user, {upsert: true}, function(err, cursor){
			//
		});
	}
} 




		/*
		var create = {
			create: {
				type: 'json0', 
				data: user
			}
		};
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