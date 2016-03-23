(function() {
  var mainCtrl = angular.module('mainCtrl', []);

  mainCtrl.controller('MainCtrl', ['$rootScope', '$scope', 'Auth',
    function($rootScope, $scope, Auth) {
      $scope.user = null;

      $scope.clearUser = () => {
        $scope.user = {
          username: null,
          password: null
        };
      };

      $scope.login = () => {
        Auth.login($scope.user);
      };

      $scope.logout = () => {
        Auth.logout();
        $scope.clearUser();
      };

      $scope.clearUser();
    }
  ]);
})();
