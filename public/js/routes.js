(function() {
  var managerTasks = angular.module('managerTasks');

  managerTasks.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/', {
        templateUrl: 'js/partials/index.html'
      }).
      when('/dashboard', {
        templateUrl: 'js/partials/dash.html'
      }).
      when('/error', {
        templateUrl: 'js/partials/error.html'
      }).
      when('/404', {
        templateUrl: 'js/partials/404.html'
      }).
      when('/projects', {
        templateUrl: 'js/partials/projects/list.html',
        controller: 'ProjectListCtrl'
      }).
      when('/projects/new', {
        templateUrl: 'js/partials/projects/new.html',
        controller: 'ProjectNewCtrl'
      }).
      when('/projects/:id/edit', {
        templateUrl: 'js/partials/projects/edit.html',
        controller: 'ProjectEditCtrl'
      }).
      when('/projects/:id', {
        templateUrl: 'js/partials/projects/show.html',
        controller: 'ProjectShowCtrl'
      }).
      when('/signup', {
        templateUrl: 'js/partials/signup/signup.html',
        controller: 'MainCtrl'
      }).
      when('/users', {
        templateUrl: 'js/partials/users/list.html',
        controller: 'UserListCtrl'
      }).
      when('/users/new', {
        templateUrl: 'js/partials/users/new.html',
        controller: 'UserNewCtrl'
      }).
      when('/users/:id/edit', {
        templateUrl: 'js/partials/users/edit.html',
        controller: 'UserEditCtrl'
      }).
      when('/users/:id', {
        templateUrl: 'js/partials/users/show.html',
        controller: 'UserShowCtrl'
      }).
      when('/forgot_password', {
        templateUrl: 'js/partials/signup/forgot.html',
        controller: 'MainCtrl'
      }).
      when('/reset/:token', {
        templateUrl: 'js/partials/signup/reset.html',
        controller: 'ResetPwdCtrl'
      }).
      otherwise({
        redirectTo: '/404'
      });
    }
  ]);
})();
