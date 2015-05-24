angular.module('todoList', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "views/tabs/tabs.html",
    controller: "MainCtrl",
    controllerAs: 'main'
  })


  .state('tab.lists', {
    url: '/lists',
    views: {
      'lists': {
        templateUrl: 'views/lists/lists.html',
        controller: 'ListsCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('tab.todo', {
      url: '/todo',
      views: {
        'todo': {
          templateUrl: 'views/todo/todo.html',
          controller: 'TodoCtrl',
          controllerAs: 'vm'
        }
      }
    })

  .state('tab.users', {
    url: '/users',
    views: {
      'users': {
        templateUrl: 'views/users/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'vm'
      }
    }
  })


  $urlRouterProvider.otherwise('/tab/todo');
})

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