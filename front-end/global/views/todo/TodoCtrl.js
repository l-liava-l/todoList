(function(){
	angular.module('todoList')
		.controller('TodoCtrl', TodoCtrl);

	TodoCtrl.$inject = ['$scope'];

	function TodoCtrl($scope){
		var vm = this;
	}
})();

