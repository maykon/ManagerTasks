(function() {
  var mainCtrl = angular.module('mainCtrl', []);

  mainCtrl.controller('MainCtrl', ['$rootScope', '$scope', 'Auth',
    '$location',
    function($rootScope, $scope, Auth, $location) {
      $scope.user = null;
      $scope.signup = null;
      $rootScope.items = [{
        title: 'Home',
        link: '/',
        active: true
      }, {
        title: 'Dashboard',
        link: '/dashboard',
        active: false
      }, {
        title: 'Projects',
        link: '/projects',
        active: false
      }, {
        title: 'Users',
        link: '/users',
        active: false
      }];
      $scope.forgot = {
        email: null
      };

      $rootScope.dateFilterBr = 'dd/MM/yyyy HH:mm:ss';

      $rootScope.goToErro = (error) => {
        $rootScope.error = error;
        $location.path('/error');
      };

      $rootScope.showMessage = (message) => {
        $rootScope.message = message;
        $('#message').fadeIn('fast');
        $rootScope.$broadcast('messageShowed');
      };

      $rootScope.clearMessage = () => {
        $('#message').fadeOut(3000, () => {
          $rootScope.message = '';
        });
      };

      $rootScope.$on('messageHided', () => {
        $rootScope.clearMessage();
      });

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

      $scope.forgotPwd = () => {
        Auth.forgot_pwd($scope.forgot);
        $scope.forgot = {
          email: null
        };
      }

      $scope.init = () => {
        $scope.clearUser();
        $scope.signup = $scope.userSchema();
        $scope.signup.email = null;
      };
      $scope.init();
    }
  ]);

  mainCtrl.controller('ResetPwdCtrl', ['$rootScope', '$scope', 'Auth',
    '$routeParams',
    function($rootScope, $scope, Auth, $routeParams) {
      $scope.reset = null;

      $scope.clearReset = () => {
        return {
          password: null,
          conf_pwd: null
        };
      };

      $scope.findToken = (token) => {
        Auth.reset_token(token);
      };

      $scope.resetPwd = () => {
        if ($scope.reset.password !== $scope.reset.conf_pwd) {
          $scope.reset = $scope.clearReset();
          return $rootScope.showMessage('Senha não confere!');
        }
        Auth.change_pwd($scope.reset);
        $scope.reset = $scope.clearReset();
      };

      $scope.init = () => {
        $scope.reset = $scope.clearReset();
        $scope.findToken($routeParams.token);
      };
      $scope.init();
    }
  ]);
})();
