(function(){
	angular.module('todoList')
		.controller('ListsCtrl', ListsCtrl);

	ListsCtrl.$inject = ['$scope', 'core'];

	function ListsCtrl($scope, core){
		var vm = this;
	
		vm.createList = createList;
		vm.setList = setList;

		getLists();
		
		console.log('ListsCtrl', $scope); 

		function getLists(params){
			var params = {
				email: core.user.email
			};

			core.getLists(params, onSuccess);

			function onSuccess(data){
				vm.lists = data;
			}
		}

		function setList(list){
			$scope.main.list = list;
		}

		function createList(title){
			core.createList({
				title: title,
				email: core.user.email
			}, onSuccess);

			function onSuccess(data){
				getLists();
			}
		}
	}
})();

