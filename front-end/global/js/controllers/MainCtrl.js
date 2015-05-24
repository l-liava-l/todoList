(function(){

	angular.module('todoList')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope', 'core'];

	function MainCtrl($scope, core){
		var main = this;
		onSuccess();
		if(window.plugins){
			window.plugins.googleplus.login({}, onSuccess, onError);
		}
		
		function onSuccess(obj){
			core.updateUser({params: 'yeah'});
		}

		function onError(msg){
			console.log('Auth error:', msg)
		}
	}
})();

