(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower', 'localWriter', '$q'];

    function core(requester, waysKnower, localWriter, $q) {

        var socket, API = {
           updateUser: updateUser,
           createList: createList,
           getLists: getLists,
           createTodo: createTodo,
           getTodoListed: getTodoListed,
           setTodoStatus: setTodoStatus,
           getUsers: getUsers,
           addUserToList: addUserToList,
           getListUsers: getListUsers,
           socketConnect: socketConnect,
           socketEmitUser: socketEmitUser
        };

        return API;

        function socketEmitUser(params){
            socket.emit('user', params)
        }

        function socketConnect(onSuccess){
            socket = io.connect(waysKnower.socket);
            socket.on('connect', onSuccess);
        }

        function getListUsers(params, onSuccess){
            requester.post(waysKnower.getListUsers, params)
                .then(onSuccess, onError);
        }

        function addUserToList(params, onSuccess){
            requester.post(waysKnower.addUserToList, params)
                .then(onSuccess, onError);
        }

        function getUsers(params, onSuccess){
            requester.post(waysKnower.getUsers, params)
                .then(onSuccess, onError);
        }

        function setTodoStatus(params, onSuccess){
            requester.post(waysKnower.setTodoStatus, params)
                .then(onSuccess, onError);
        }

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