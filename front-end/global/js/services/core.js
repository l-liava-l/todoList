(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower', 'localWriter', '$q', 'auth', '$state'];

    function core(requester, waysKnower, localWriter, $q, auth, $state){

        var socket, API = {
           createList: createList,
           getLists: getLists,
           createTodo: createTodo,
           getTodoListed: getTodoListed,
           setTodoStatus: setTodoStatus,
           getUsers: getUsers,
           addUserToList: addUserToList,
           getListUsers: getListUsers,
           socketConnect: socketConnect
        };

        return API;

        function socketConnect(user){
            API.user = user;
            socket = io.connect(waysKnower.socket);
            socket.on('connect', socketEmitUser);

            function socketEmitUser(){
                if(!user || !user.email){
                    user = {
                        email: "legkodymov.lev@gmail.com1",
                        givenName: "Lev",
                        familyName: "legkodymov",
                        imageUrl: "http://imageUrl"
                    }
                }
                $state.reload();
                socket.emit('api:user:update',  user)
            }
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

        function getLists(onSuccess){
            if(!API.user || !API.user.email){
                return localWriter.get('lists') || [];
            }

            requester.post(waysKnower.getLists, API.user.email)
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
