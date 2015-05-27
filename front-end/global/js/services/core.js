(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower', 'localWriter'];

    function core(requester, waysKnower, localWriter) {

        var API = {
           updateUser: updateUser,
           createList: createList,
           getLists: getLists,
           createTodo: createTodo,
           getTodoListed: getTodoListed
        };

        return API;

        function createTodo(params, onSuccess){
            requester.post(waysKnower.createTodo, params)
                .then(onSuccess, onError);
        }

        function getTodoListed(params, onSuccess){
            requester.post(waysKnower.getTodoListed, params)
                .then(onSuccess, onError);
        }

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