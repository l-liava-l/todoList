(function() {
    'use strict';

    angular.module('dashboard')
        .factory('core', core);

    core.$inject = ['requester',  'waysKnower'];

    function core(requester, waysKnower) {

        var API = {
           
        };
        
        setThemesList(waysKnower.topicsMap);
        

        return API;
    }
})();