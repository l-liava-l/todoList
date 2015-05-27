(function(){
	angular.module('todoList')
		.controller('TodoCtrl', TodoCtrl);

	TodoCtrl.$inject = ['$scope', 'core', '$timeout', '$state'];

	function TodoCtrl($scope, core, $timeout, $state){
		var vm = this;

		vm.createTodo = createTodo;

		if(!$scope.main.list || !$scope.main.list.id){
			$timeout(()=> $state.go('lists'));
			return false;
		}

		getTodoListed()

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

		$scope.data = {
			showDelete: false
		};

		$scope.edit = function(item) {
			alert('Edit Item: ' + item.id);
		};

		$scope.share = function(item) {
			alert('Share Item: ' + item.id);
		};

		$scope.moveItem = function(item, fromIndex, toIndex) {
			$scope.items.splice(fromIndex, 1);
			$scope.items.splice(toIndex, 0, item);
		};

		$scope.onItemDelete = function(item) {
			$scope.items.splice($scope.items.indexOf(item), 1);
		};
	}
})();

