(function(){
	angular.module('todoList')
		.controller('ListsCtrl', ListsCtrl);

	ListsCtrl.$inject = ['$scope', 'core', 'localWriter', '$state', '$q'];

	function ListsCtrl($scope, core, localWriter, $state, $q){
		var vm = this;
	
		vm.createList = createList;
		vm.setList = setList;

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

		function setList(list){
			if(list && list.id){
				$scope.main.list = list;
				localWriter.set('list')(list);
				$state.go('todo');
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
	}
})();

