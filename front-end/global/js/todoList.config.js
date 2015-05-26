'use strict';
(function() {
    angular.extend(angular, {
        toQueryString: toParam
    });

    function toParam(object, prefix) {
        var stack = [];
        var value;
        var key;
        for (key in object) {
            if(typeof key !=='undefined' && key !== ''){
                value = object[key];
                key = prefix ? prefix + '[' + key + ']' : key;
                if (value === null) {
                    value = encodeURIComponent(key) + '=';
                } else if (typeof(value) !== 'object') {
                    value = encodeURIComponent(key) + '=' + encodeURIComponent(value);
                } else {
                    value = toParam(value, key);
                }
                stack.push(value);
            }
        }
        return stack.join('&');
    }
}());

angular.module('todoList', ['ionic'])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

  var reqHeaders = $httpProvider.defaults.headers;
      reqHeaders.common['Accept'] = 'application/json, text/javascript, */*; q=0.01';
      reqHeaders.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  
  $httpProvider.defaults.transformRequest.unshift(function(params) {
      return angular.isObject(params) ? angular.toQueryString(params) : params;
  }); 

  $stateProvider

  .state('lists', {
    url: '/lists',
    views: {
      'content': {
        templateUrl: 'views/lists/lists.html',
        controller: 'ListsCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('todo', {
      url: '/todo',
      views: {
        'content': {
          templateUrl: 'views/todo/todo.html',
          controller: 'TodoCtrl',
          controllerAs: 'vm'
        }
      }
    })

  .state('users', {
    url: '/users',
    views: {
      'content': {
        templateUrl: 'views/users/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'vm'
      }
    }
  })


  $urlRouterProvider.otherwise('/todo');
}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
});