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
              $rootScope.showMessage(response.data.message);
              cb();
              $location.path('/');
            })
            .catch((error) => {
              cb();
            });
        },
        logout: () => {
          $http.get('/logout')
            .then((response) => {
              $cookies.remove('user');
              $rootScope.currentUser = null;
              $rootScope.showMessage(response.data.message);
              $location.path('/');
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
              $rootScope.showMessage(response.data.message);
              $location.path('/');
            });
        },
        forgot_pwd: (email) => {
          $http.post('/forgot_pwd', email)
            .then((response) => {
              $rootScope.showMessage(response.data.message);
              $location.path('/');
            });
        },
        reset_token: (token) => {
          $http.get('/reset/' + token)
            .then((response) => {
              $rootScope.showMessage(response.data.message);
            });
        },
        change_pwd: (reset) => {
          $http.post('/reset_token', reset)
            .then((response) => {
              $rootScope.showMessage(response.data.message);
              $location.path('/');
            });
        }
      };
    }
  ]);
})();
