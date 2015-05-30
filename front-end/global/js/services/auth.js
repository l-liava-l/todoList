(function() {
    'use strict';

    angular.module('todoList')
        .factory('auth', auth);

    auth.$inject = [];

    function auth(){
    	return {
    		connect: connect
    	}

    	function connect(onSuccess){
            window.plugins.googleplus.isAvailable(
                function(available) {
                  if(available) {
                    window.plugins.googleplus.login({}, onSuccess, onError);
                  }
                }
            );

            function onError(msg){
                console.log('Auth error:', msg)
            }
        }
    }
})();