(function() {
  var managerTasks = angular.module('managerTasks', ['ngCookies', 'ngRoute',
    'interceptorFactory', 'authFactory', 'projectFactory', 'mainCtrl',
    'projectCtrl', 'bsComponents'
  ]);

  managerTasks.config(function($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('Interceptor');
  });
})();
