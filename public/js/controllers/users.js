(function() {
  var userCtrl = angular.module('userCtrl', []);

  userCtrl.constant('usersPath', {
    users_path: '#/users',
    new_user_path: '#/users/new'
  });

  userCtrl.controller('UserListCtrl', ['$rootScope', '$scope',
    'User', 'usersPath', '$route',
    function($rootScope, $scope, User, usersPath, $route) {
      $scope.users = [];
      $scope.search = '';
      $scope.dateFilter = $rootScope.dateFilterBr;
      $scope.users_path = usersPath.users_path;
      $scope.new_user_path = usersPath.new_user_path;

      $scope.findAll = () => {
        User.query().$promise
          .then((response) => $scope.users = response);
      };

      $scope.deleteUser = (user) => {
        User.delete({
            id: user._id
          }).$promise
          .then((response) => {
            $rootScope.showMessage(response.message);
            $route.reload();
          });
      };

      $scope.init = () => {
        $scope.findAll();
      };
      $scope.init();
    }
  ]);

  userCtrl.controller('UserNewCtrl', ['$rootScope', '$scope',
    '$location', 'User', 'usersPath',
    function($rootScope, $scope, $location, User, usersPath) {
      $scope.user = new User();
      $scope.users_path = usersPath.users_path;

      $scope.saveUser = () => {
        $scope.user.$save()
          .then((response) => {
            $rootScope.showMessage(response.message);
            $location.path('/users');
          });
      };
    }
  ]);

  userCtrl.controller('UserShowCtrl', ['$rootScope', '$scope',
    '$routeParams', 'User', 'usersPath',
    function($rootScope, $scope, $routeParams, User,
      usersPath) {
      $scope.user = null;
      $scope.users_path = usersPath.users_path;
      $scope.dateFilter = $rootScope.dateFilterBr;

      $scope.findUser = (id) => {
        User.get({
            id: id
          }).$promise
          .then((response) => $scope.user = response.user);
      };

      $scope.init = () => {
        $scope.findUser($routeParams.id);
      };
      $scope.init();
    }
  ]);

  userCtrl.controller('UserEditCtrl', ['$rootScope', '$scope',
    '$location', '$routeParams', 'User', 'usersPath', '$timeout',
    function($rootScope, $scope, $location, $routeParams, User,
      usersPath, $timeout) {
      $scope.user = null;
      $scope.users_path = usersPath.users_path;

      $scope.findUser = (id) => {
        User.get({
            id: id
          }).$promise
          .then((response) => {
            var user = response.user;
            $scope.user = user;
            $scope.user.password = null;
            $timeout(() => {
              $scope.user.password = null;
            }, 300);
          });
      };

      $scope.updateUser = () => {
        User.update({
            id: $scope.user._id
          }, $scope.user).$promise
          .then((response) => {
            $rootScope.showMessage(response.message);
            $location.path('/users');
          });
      };

      $scope.init = () => {
        $scope.findUser($routeParams.id);
      };
      $scope.init();
    }
  ]);
})();
