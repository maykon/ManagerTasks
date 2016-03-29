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
    $httpProvider.defaults.timeout = 1000;
  });

  managerTasks.run(function($templateCache, $route, $http) {
    var url;
    for (var i in $route.routes) {
      if (url = $route.routes[i].templateUrl) {
        $http.get(url, {
          cache: $templateCache
        });
      }
    };

    var components = ['js/components/bs-form-login.html',
      'js/components/bs-message.html', 'js/components/bs-nav-item.html',
      'js/components/bs-nav.html', 'js/components/bs-panel.html',
      'js/components/bs-table.html'
    ];
    components.forEach((comp) => {
      $http.get(comp, {
        cache: $templateCache
      });
    });
  })
})();
