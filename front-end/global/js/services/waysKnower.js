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
			getTodoListed: 'http://192.168.0.105:8002/api/todo/get/listed'
		};
		
		return { $get: _get }

		function _get() {
			return serverAPI;
		}
	}
})();
