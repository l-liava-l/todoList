(function(){

	angular.module('todoList')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope', 'core', 'localWriter', '$state', '$timeout'];

	function MainCtrl($scope, core, localWriter, $state, $timeout){
		var main = this;

		$scope.main.list = localWriter.get('list');

		console.log(Swarm);
	}
})();

