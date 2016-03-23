(function() {
  var managerTasks = angular.module('managerTasks', ['ngCookies', 'ngRoute',
    'authFactory', 'projectFactory', 'mainCtrl', 'projectCtrl'
  ]);

  managerTasks.config(['$routeProvider',
    function($routeProvider, $location) {
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
      otherwise({
        redirectTo: '/404'
      });
    }
  ]);

  managerTasks.run(['$rootScope',
    function($rootScope) {
      $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl) {
        $rootScope.previousPage = absOldUrl;
      });
    }
  ]);
})();
