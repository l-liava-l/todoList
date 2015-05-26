(function(){

	angular.module('todoList')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope', 'core'];

	function MainCtrl($scope, core){
		var main = this;

		document.addEventListener("deviceready", auth, false);
		
		main.repeat = new Array(50);
		
		updateUser({
			email: "legkodymov.lev@gmail.com",
			givenName: "Lev",
			familyName: "legkodymov",
			imageUrl: "http://imageUrl"
		});

		function updateUser(obj){
			main.user = obj;
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

