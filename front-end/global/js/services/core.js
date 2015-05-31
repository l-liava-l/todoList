(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower', 'localWriter', '$q', 'auth', '$state'];

    function core(requester, waysKnower, localWriter, $q, auth, $state){
        
        var socket, API = {

        };
        socketConnect();
        document.addEventListener("deviceready",()=>
            auth.connect(socketConnect)
        , false);

        document.addEventListener("offline", ()=> 
            API.network = false,
        false);

        document.addEventListener("online", ()=>
            API.network = true,
        false);

        setAPI('getListUsers', (params)=>
            requester.post(waysKnower.getListUsers, params)
        );

        setAPI('addUserToList', (params)=>
            requester.post(waysKnower.addUserToList, params)
        );

        setAPI('getUsers', (params)=>
            requester.post(waysKnower.getUsers, params)
        );

        setAPI('setTodoStatus', (params)=>
            requester.post(waysKnower.setTodoStatus, params)
        );

        setAPI('createTodo', (params)=>
            requester.post(waysKnower.createTodo, params)
        );

        setAPI('getTodoListed', (params)=>
            requester.post(waysKnower.getTodoListed, params)
        );

        setAPI('getLists', (params)=>
            requester.post(waysKnower.getLists, params)    //email            
        );

        setAPI('createList', (params)=>
            requester.post(waysKnower.createList, params)   
        );


        return API;

        function socketConnect(user){
            API.user = user;
            socket = io.connect(waysKnower.socket);
            socket.on('connect', socketEmitUser);

            function socketEmitUser(){
                if(!user || !user.email){
                    user = {
                        email: "legkodymov.lev@gmail",
                        givenName: "Lev",
                        familyName: "legkodymov",
                        imageUrl: "http://imageUrl"
                    }
                }
                $state.reload();
                socket.emit('api:user:update',  user);
                requester.post(waysKnower.getUsers, {mask: 'leg'});
            }
        }

        function onError(msg){
            console.log('req errored:', msg);
        }

        function setAPI(name, req){
            API[name] = function(params, onSuccess){
                if(!API.network || (!API.user || !API.user.email)){
                    console.log(arguments);
                    return false;
                }

                req(params).then(onSuccess, onError);
            }
        }
    }
})();
