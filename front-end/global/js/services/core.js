(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower'];

    function core(requester, waysKnower) {

        var API = {
           updateUser: updateUser
        };

        return API;


        function updateUser(params, onSuccess){
            requester.post(waysKnower.updateUser, params)
                .then(onSuccess, onError);
        }

        function onError(msg){
            console.log('req errored:', msg);
        }
    }
})();