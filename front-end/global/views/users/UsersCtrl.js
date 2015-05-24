(function(){
	angular.module('todoList')
		.controller('UsersCtrl', UsersCtrl);

	UsersCtrl.$inject = ['$scope'];

	function UsersCtrl($scope){
		var vm = this;
	}
})();

