angular.module('todoList', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })


  .state('tab.lists', {
    url: '/lists',
    views: {
      'tab-dash': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('tab.todo', {
      url: '/todo',
      views: {
        'tab-chats': {
          templateUrl: 'templates/todo.html',
          controller: 'TodoCtrl',
          controllerAs: 'vm'
        }
      }
    })

  .state('tab.users', {
    url: '/users',
    views: {
      'tab-chats': {
        templateUrl: 'templates/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'vm'
      }
    }
  })


  $urlRouterProvider.otherwise('/tab/todo');
});
