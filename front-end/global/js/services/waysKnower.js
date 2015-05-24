(function() {
	'use strict';

	angular.module('todoList')
		.provider('waysKnower', waysKnower);

	waysKnower.$inject = [];

	function waysKnower() {
		var serverAPI = {

		};
		
		return { $get: _get }

		function _get() {
			return serverAPI;
		}
	}
})();
