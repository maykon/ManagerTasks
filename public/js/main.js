(function() {
  var managerTasks = angular.module('managerTasks', ['ngCookies', 'ngRoute',
    'authFactory', 'projectFactory', 'mainCtrl', 'projectCtrl'
  ]);

  managerTasks.run(['$rootScope',
    function($rootScope) {
      $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl) {
        $rootScope.previousPage = absOldUrl;
      });
    }
  ]);
})();
