(function(){
	angular.module('todoList')
		.controller('ListsCtrl', ListsCtrl);

	ListsCtrl.$inject = ['$scope', 'core', 'localWriter', '$state', '$q', '$ionicModal'];

	function ListsCtrl($scope, core, localWriter, $state, $q, $ionicModal){
		var vm = this;
	
		vm.createList = createList;
		vm.setList = setList;
		vm.openModal = openModal;
		vm.getUsers = getUsers;
		vm.addUserToList = addUserToList;

		$ionicModal.fromTemplateUrl('views/searchUsers/searchUsers.html', {
	        scope: $scope,
	        animation: 'slide-in-up'
	    }).then(function(modal) {
	       $scope.modal = modal;
	    });

		getLists();

		function getLists(params){
			return $q(function(resolve, reject){
				var params = {
					email: core.user.email
				};

				core.getLists(params, onSuccess);

				function onSuccess(data){
					vm.lists = data;
					resolve(data);
				}
			});
		}

		function addUserToList(user){
			console.log(user, $scope.main.list);
			core.addUserToList({
				email: user.email,
				listId: $scope.main.list.id

			}, onSuccess);

			function onSuccess(data){
				vm.users = data;
			}
		}

		function setList(list){
			if(list && list.id){
				$scope.main.list = list;
				localWriter.set('list')(list);
				$state.go('todo');
			}	
		}

		function getListUsers(list){
			core.getListUsers({list: list.id}, onSuccess);

			function onSuccess(data){
				list.users = data;
			}
		}
		
		function getUsers(mask){
			core.getUsers({mask: mask}, onSuccess);

			function onSuccess(data){
				vm.users = data;
			}
		}

		function createList(title){
			core.createList({
				title: title,
				email: core.user.email
			}, onSuccess);

			function onSuccess(data){
				setList(data);
			}
		}

		function openModal() {
		    $scope.modal.show();
		};
	}
})();

