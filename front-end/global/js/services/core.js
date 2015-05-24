(function() {
    'use strict';

    angular.module('todoList')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower'];

    function core(requester, waysKnower) {

        var API = {
           
        };
        
        setThemesList(waysKnower.topicsMap);
        

        return API;
    }
})();