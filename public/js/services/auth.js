(function() {
  var authFactory = angular.module('authFactory', []);

  authFactory.factory('Auth', ['$cookies', '$rootScope', '$http',
    '$location',
    function($cookies, $rootScope, $http, $location) {
      $rootScope.currentUser = $cookies.get('user') || null;

      return {
        login: (user, cb) => {
          $http.post('/login', user)
            .then((response) => {
              $cookies.put('user', response.data.username);
              $rootScope.currentUser = response.data.username;
              $rootScope.messages = response.data.messages;
              cb();
              $location.path('/');
            })
            .catch((error) => {
              cb();
              $rootScope.goToErro(error.data.error);
            });
        },
        logout: () => {
          $http.get('/logout')
            .then((response) => {
              $cookies.remove('user');
              $rootScope.currentUser = null;
              $rootScope.messages = response.data.messages;
              $location.path('/');
            })
            .catch((error) => {
              $rootScope.goToErro(error.data.error);
            });
        },
        signup: () => {
          $location.path('/signup');
        },
        register: (user) => {
          $http.post('/signup', user)
            .then((response) => {
              $cookies.put('user', response.data.username);
              $rootScope.currentUser = response.data.username;
              $rootScope.messages = response.data.messages;
              $location.path('/');
            })
            .catch((error) => {
              $rootScope.goToErro(error.data.error);
            });
        }
      };
    }
  ]);
})();
