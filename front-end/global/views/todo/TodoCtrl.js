(function(){
	angular.module('todoList')
		.controller('TodoCtrl', TodoCtrl);

	TodoCtrl.$inject = ['$scope'];

	function TodoCtrl($scope){
		var vm = this;

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

