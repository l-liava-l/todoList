(function(){

	angular.module('todoList')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope', 'core', 'localWriter', '$state', '$timeout'];

	function MainCtrl($scope, core, localWriter, $state, $timeout){
		var main = this;

		$scope.main.list = localWriter.get('list');

		document.addEventListener("deviceready", auth, false);

		updateUser({
			email: "legkodymov.lev@gmail.com1",
			givenName: "Lev",
			familyName: "legkodymov",
			imageUrl: "http://imageUrl"
		});
		
		function updateUser(obj){
			main.user = obj;
			core.updateUser(obj);

			core.socketConnect(function(){
				core.socketEmitUser({email: obj.email});
			});
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

