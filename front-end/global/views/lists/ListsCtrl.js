(function(){
	angular.module('todoList')
		.controller('ListsCtrl', ListsCtrl);

	ListsCtrl.$inject = ['$scope'];

	function ListsCtrl($scope){
		var vm = this;
	}
})();

