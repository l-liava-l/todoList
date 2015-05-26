(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower'];

    function core(requester, waysKnower) {

        var API = {
           updateUser: updateUser,
           createList: createList,
           getLists: getLists
        };

        return API;

        function getLists(params, onSuccess){
            requester.post(waysKnower.getLists, params)
                .then(onSuccess, onError);
        }

        function updateUser(params, onSuccess){
            API.user = params;
            requester.post(waysKnower.updateUser, params)
                .then(onSuccess, onError);
        }

        function createList(params, onSuccess){
            requester.post(waysKnower.createList, params)
                .then(onSuccess, onError);
        }

        function onError(msg){
            console.log('req errored:', msg);
        }
    }
})();