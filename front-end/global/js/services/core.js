(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower', 'localWriter', '$q', 'auth', '$state'];

    function core(requester, waysKnower, localWriter, $q, auth, $state){
        var API = {
            updateUser: updateUser,
            getListUsers: getListUsers,
            addUserToList: addUserToList,
            getUsers: getUsers,
            setTodoStatus: setTodoStatus,
            createTodo: createTodo,
            getTodoListed: getTodoListed,
            getLists: getLists,
            createList: createList
        };
        
        var swarmHost = new Swarm.Host('client' + Date.now() + "~ssn");
        swarmHost.connect('ws://127.0.0.1:8002/');

        document.addEventListener("deviceready", onDeviceReady, false);
        onDeviceReady();
        
       
       
        

        return API;

        function onDeviceReady(){
            console.log('onDeviceReady');
            auth.connect(API.updateUser(onUserUpdated));

            function onUserUpdated(data){
                var List = Swarm.Model.extend("List", {
                    defaults: {
                        title: "",
                        id: 0,
                        todoes: {},
                    }
                });

                API.createList({
                    creator: "leggggsddgggg@gmail",
                    title: "list №" + Date.now()
                });

                getLists(API.user.email, onSuccess)

                function onSuccess(listsIds){
                    console.log(listsIds);
                } 
            }
        }

        function updateUser(onSuccess){
            return function(params){
                params = params && params.email ? params : {
                    email: "leggggsddgggg@gmail",
                    givenName: "LEV",
                    familyName: "legkodymov",
                    imageUrl: "http://imageUrl",
                    lists: []
                }

                API.user = params;

                requester.post(waysKnower.updateUser, params)
                    .then(onSuccess, onError);
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

        function getLists(email, onSuccess){
            requester.post(waysKnower.getLists, {email: email})
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

        /*
        sharejs.client.open('lists', '1433606385077', 'http://localhost:8002/channel', function(error, doc) {
            console.log(error, doc);
        });

         var BackendModel = Swarm.Model.extend("Editor", {
            defaults: {
                cursors: [],
                content: ""
            }
        });
        */



        //var context = doc.createContext();

       
        /*
            
        var socket = new BCSocket('http://localhost:8002/channel', {reconnect: true});
        var share = new sharejs.Connection(socket);
   
        var doc = share.get('lists', '1433606385077');
     
        doc.subscribe(function(){
            console.log('onChange:', doc.getSnapshot());
        });

        doc.whenReady(function(){
            console.log('onReady: ', doc.getSnapshot());
            var context = doc.createContext();
            console.log(context);
            doc.del(context, function(){
                console.log('callback', arguments);
            });
        });
        
        console.log(context);
        */
        
        //
        /*
       
       legggggggg@gmail

        console.log('share', share);

  doc.submitOp([{p:['givenName', 4], si: 'test'}]);
        
        

        

        //
        */
/*
        socket.send('api:user:update', {
                        email: "leggggsddgggg@gmail",
                        givenName: "LEV",
                        familyName: "legkodymov",
                        imageUrl: "http://imageUrl"
                    });
        */
        /*
        console.log(doc);
        // Subscribe to changes
        

        // This will be called when we have a live copy of the server's data.
       

        // later, add 10 to the doc.snapshot.x property
     
*/

       