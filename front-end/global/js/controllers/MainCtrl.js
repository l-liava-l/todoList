(function(){

	angular.module('todoList')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope'];

	function MainCtrl($scope){
		var main = this;

		if(window.plugins){
			window.plugins.googleplus.login({}, onSuccess, onError);
		}
		
		function onSuccess(obj){
			
		}

		function onError(msg){

		}
	}
})();

