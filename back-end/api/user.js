module.exports = function(core, db){
	var onlineUsers = module.exports.users = {}
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

	core.post('/api/user/getByMask', function (req, res){
		var findQuery = "SELECT * FROM users WHERE email LIKE '" + req.body.mask +"%';";

		db.query(findQuery, function(err, rows, fields){
		  if(err){ throw err; }
		  res.send(rows);
		});
	});

	function updateUser(user){
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
	}
} 



