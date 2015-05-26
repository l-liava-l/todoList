(function(){
	angular.module('todoList')
		.controller('ListsCtrl', ListsCtrl);

	ListsCtrl.$inject = ['$scope', 'core'];

	function ListsCtrl($scope, core){
		var vm = this;

		/*
		createList({
			title: 'Tommorow',
			email: core.user.email
		});
		*/
		getLists({
			email: core.user.email
		});

		function getLists(params){
			core.getLists(params, onSuccess);

			function onSuccess(data){
				console.log(data);
				vm.lists = data;
			}
		}

		function createList(params){
			core.createList(params, onSuccess);

			function onSuccess(data){
				console.log(data);
			}
		}
	}
})();

