 /*
 *  Простой драйвер для работы с LocalStorage.
 *  Как и cacheWriter может выступать в роли декоратора.
 *  
 *  Methods: 
 *    .get( name_string );
 *    .set( name_string [, callback])(data);
 */
(function() {
    'use strict';

    angular.module('todoList')
        .provider('localWriter', localWriter);

    localWriter.$inject = [];

    function localWriter() {

        this.$get = _get;

        function _get() {
            return {
                set: localSet,
                get: localGet,
                remove: remove,
            };
        }

        return this;

        function localSet(name, onSuccess, params) {
            return function(data){
                if(typeof data === 'object') {
                    data = angular.toJson(data);
                }
                
                window.localStorage.setItem(name, data);

                if(typeof onSuccess === 'function') {
                    onSuccess(data, params)
                }
            }
        }

        function remove(name){
            window.localStorage.removeItem(name);
        }

        function localGet(name) { 
            try {
               return JSON.parse(window.localStorage.getItem(name));
            } catch(e) {
                return window.localStorage.getItem(name);
            }
        }
    }
})();