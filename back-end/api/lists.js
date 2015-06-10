module.exports = function(core, db, Swarm){
	var lists = db.collection('lists');

	var List = Swarm.Model.extend("List", {
	    defaults: {
	        title: "",
	        id: 0,
	        todoes: {},
	        creator: ""
	    }
	});

	core.post('/api/lists/create', function (req, res){
		if(!req.body.creator || !req.body.title){
			return res.send(false);
		}

		var id = "L" + Date.now();
		var list = new List(id); 

		
		list.set({
			title: req.body.title,
			creator: req.body.creator,
			users: [req.body.creator],
			id: id
		});

		addList(req.body.creator, id);

		console.log('create list ' + id);

		function addList(userId, listId){
			var collection = db.collection('users');
			collection.update({ _id: userId}, {$push: {lists: listId}}, function(){
				getLists(userId, res);
			})
		}
	});

	core.post('/api/lists/get', function (req, res){
		req.body.email ? getLists(req.body.email, res) : res.send(false);
	});

	function getLists(email, res){
		var users = db.collection('users');
		
		users.find({_id: email}).toArray(function(err, docs){
			res.send(docs[0].lists)
		});
	}
}



	
	/*
	core.post('/api/lists/addUser', function (req, res){
		if(!req.body.email || !req.body.listId){
			return res.send(false);
		}
	
		lists.find({_id: req.body.listId}).toArray(function(err, arr){
			if(!arr || arr[0].users.indexOf(req.body.email) >= 0){
				return res.send(false);
			}

			var id = arr[0].users.length;

			var opData = {op: [{p: ["users", id], li: req.body.email}]};
			livedb.submit('lists', req.body.listId, opData, function(err, version) {
				console.log('err', err, version);
		  		if(!err){res.send(true)}
			});	
		});
	});


	core.post('/api/todo/create', function (req, res){
		if(!req.body.text || !req.body.listId){
		 	return res.send(false);
		}
		
		req.body.id = Date.now();
		req.body.status = 'new';
		
		var opData = {op: [{p: ["todoes", req.body.id], oi: req.body}]};
		livedb.submit('lists', req.body.listId, opData, function(err, version) {
			console.log('err', err, version);
	  		if(!err){res.send(true)}
		});	
	});

	return clientAPI;

	
	
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


	function addUser(listId, email, callback){
		var insertQuery = "INSERT INTO `group`(listId, email) " 
						 + " VALUES ('"+listId+"','"+email+"');";

		db.query(insertQuery, function(err, rows, fields) {
		  if(err){throw err;}
		  console.log('group added');
		  callback();
		});
	}
	*/


