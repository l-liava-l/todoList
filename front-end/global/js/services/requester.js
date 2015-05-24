(function() {
    'use strict';

    angular.module('todoList')
        .provider('requester', requester);

    requester.$inject = [];

    function requester() {

        var API = {
            $get: ['$http', '$q', $get]
        };

        return API;

        function $get($http, $q) {

            return {
                get: req('GET'),
                post: req('POST'),
                delete: req('DELETE'),
                put: req('PUT')
            }

            function req(method) {
                return function(url, data) {

                    return $q(promise)

                    function promise(resolve, reject) {

                        if(method === 'GET') {
                            url = concatUrlWithUkey(url);
                        }

                        var params = {
                            method: method,
                            url: url,
                            data: {},
                        };

                        if(method !== 'GET') {
                            params.data = data;
                        }

                        $http(params).success(onS).error(onE);
                        
                        function onS(data) { 
                            checkResponse(fromJson(data), resolve); 
                        }

                        function onE(data) { 
                            checkResponse(fromJson(data), reject); 
                        }
                    }
                }
            }
        }

        /* ============ Helpers ============ */
        
        function concatUrlWithUkey(url) {
            return url;
        }

        function checkResponse(data, callback){
            return callback ? callback(data) : data;
        }

        function fromJson(data){
            try{data = angular.fromJson(data)}
            catch(e) {}

            return data;
        }
    }
})();