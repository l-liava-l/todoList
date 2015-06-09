(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower', 'localWriter', '$q', 'auth', '$state'];

    function core(requester, waysKnower, localWriter, $q, auth, $state){
        var API = {};
        
        var swarmHost = new Swarm.Host('client' + Date.now() + "~ssn");
        swarmHost.connect('ws://127.0.0.1:8002/');


        console.log(swarmHost);


        genAPI();

        API.createList({
            creator: "leggggsddgggg@gmail",
            title: "list №" + Date.now()
        });

        document.addEventListener("deviceready",()=>
            auth.connect(API.updateUser)
        , false);
      

        return API;

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

       

        function genAPI(){
            setAPI('updateUser', function(params){
                params = params && params.email ? params : {
                    email: "leggggsddgggg@gmail",
                    givenName: "LEV",
                    familyName: "legkodymov",
                    imageUrl: "http://imageUrl",
                    lists: ['sdds']
                }

                return requester.post(waysKnower.updateUser, params)
            });

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

            API.updateUser();
        }

        function onError(msg){
            console.log('req errored:', msg);
        }

        function setAPI(name, req){
            API[name] = function(params, onSuccess){
                req(params).then(onSuccess, onError);
            }
        }
    }
})();
