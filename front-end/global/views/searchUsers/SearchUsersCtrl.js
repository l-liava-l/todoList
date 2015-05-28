(function(){
	angular.module('todoList')
		.controller('SearchUsersCtrl', SearchUsersCtrl);

	SearchUsersCtrl.$inject = ['$scope', 'core', 'localWriter', '$state', '$q', '$ionicModal'];

	function SearchUsersCtrl($scope, core, localWriter, $state, $q, $ionicModal){
		var vm = this;
	
		vm.closeModal = closeModal;
		vm.check = true;

		console.log('SearchUsersCtrl', $scope);

	

		function closeModal() {
		    $scope.modal.show();
		};
	}
})();

