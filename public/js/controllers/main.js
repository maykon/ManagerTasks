(function() {
  var mainCtrl = angular.module('mainCtrl', []);

  mainCtrl.controller('MainCtrl', ['$rootScope', '$scope', 'Auth',
    '$location',
    function($rootScope, $scope, Auth, $location) {
      $scope.user = null;

      $rootScope.goToErro = (error) => {
        $rootScope.error = error;
        $location.path('/error');
      };

      $scope.clearUser = () => {
        $scope.user = {
          username: null,
          password: null
        };
      };

      $scope.login = () => {
        Auth.login($scope.user, $scope.clearUser);
      };

      $scope.logout = () => {
        Auth.logout();
        $scope.clearUser();
      };

      $scope.clearUser();
    }
  ]);
})();
