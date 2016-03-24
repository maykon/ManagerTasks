(function() {
  var mainCtrl = angular.module('mainCtrl', []);

  mainCtrl.controller('MainCtrl', ['$rootScope', '$scope', 'Auth',
    '$location',
    function($rootScope, $scope, Auth, $location) {
      $scope.user = null;
      $scope.signup = null;

      $rootScope.goToErro = (error) => {
        $rootScope.error = error;
        $location.path('/error');
      };

      $scope.userSchema = () => {
        return {
          username: null,
          password: null
        };
      };

      $scope.clearUser = () => {
        $scope.user = $scope.userSchema();
      };

      $scope.login = () => {
        Auth.login($scope.user, $scope.clearUser);
      };

      $scope.logout = () => {
        Auth.logout();
        $scope.clearUser();
      };

      $scope.register = () => {
        Auth.signup();
      };

      $scope.signupRegister = () => {
        Auth.register($scope.signup);
      };

      $scope.init = () => {
        $scope.clearUser();
        $scope.signup = $scope.userSchema();
      };
      $scope.init();
    }
  ]);
})();
