(function() {
  var managerTasks = angular.module('managerTasks', ['ngCookies', 'ngRoute',
    'interceptorFactory', 'authFactory', 'projectFactory', 'userFactory',
    'mainCtrl', 'dashboardCtrl', 'projectCtrl', 'userCtrl', 'bsComponents'
  ]);

  managerTasks.filter('yesNo', function() {
    return function(input) {
      return input ? 'Sim' : 'Não';
    }
  });

  managerTasks.config(function($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('Interceptor');
  });
})();
