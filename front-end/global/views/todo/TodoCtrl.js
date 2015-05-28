(function(){
	angular.module('todoList')
		.controller('TodoCtrl', TodoCtrl);

	TodoCtrl.$inject = ['$scope', 'core', '$timeout', '$state', '$ionicListDelegate'];

	function TodoCtrl($scope, core, $timeout, $state, $ionicListDelegate){
		var vm = this;

		vm.createTodo = createTodo;
		vm.setTodoStatus = setTodoStatus;

		if(!$scope.main.list || !$scope.main.list.id){
			$timeout(()=> $state.go('lists'));
			return false;
		}

		getTodoListed()

		function setTodoStatus(id, status){
			core.setTodoStatus({
				id: id,
				status: status
			}, onSuccess);

			function onSuccess(){
				$ionicListDelegate.closeOptionButtons()
				getTodoListed();
			}
		}

		function createTodo(text){
			core.createTodo({
				text: text,
				listID: $scope.main.list.id
			}, onSuccess);

			function onSuccess(data){
				getTodoListed();
			}
		}

		function getTodoListed(){
			core.getTodoListed({
				listID: $scope.main.list.id
			}, onSuccess);

			function onSuccess(data){
				vm.todoList = data;
			}
		}
	}
})();

