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
      otherwise({
        redirectTo: '/404'
      });
    }
  ]);
})();
