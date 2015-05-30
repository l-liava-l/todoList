(function() {
	'use strict';

	angular.module('todoList')
		.provider('waysKnower', waysKnower);

	waysKnower.$inject = [];

	function waysKnower() {
		var serverAPI = {
			updateUser: 'http://192.168.0.105:8002/api/user/update',
			createList: 'http://192.168.0.105:8002/api/lists/create',
			getLists: 'http://192.168.0.105:8002/api/lists/get',
			createTodo: 'http://192.168.0.105:8002/api/todo/create',
			getTodoListed: 'http://192.168.0.105:8002/api/todo/get/listed',
			setTodoStatus: 'http://192.168.0.105:8002/api/todo/set/status',
			getUsers: 'http://192.168.0.105:8002/api/user/getByMask',
			addUserToList: 'http://192.168.0.105:8002/api/lists/addUser',
			getListUsers: 'http://192.168.0.105:8002/api/lists/getUsers',
			socket: 'http://192.168.0.105:8002'
		};
		
		return { $get: _get }

		function _get() {
			return serverAPI;
		}
	}
})();
