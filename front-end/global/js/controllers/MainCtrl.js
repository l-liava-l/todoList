(function(){

	angular.module('todoList')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope', 'core'];

	function MainCtrl($scope, core){
		var main = this;

		document.addEventListener("deviceready", auth, false);
		/*
		updateUser({
			email: "legkodymov.lev@gmail.com1432507194435",
			givenName: "Lesasas",
			familyName: "Legkodymo",
			imageUrl: "http://imageUrl"
		});
		*/

		function updateUser(obj){
			console.log('user:', obj);
			core.updateUser(obj);
		}

		function auth(){
			window.plugins.googleplus.isAvailable(
			    function(available) {
			      if(available) {
			        window.plugins.googleplus.login({}, updateUser, onError);
			      }
			    }
			);

			function onError(msg){
				console.log('Auth error:', msg)
			}
		}
	}
})();

