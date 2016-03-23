(function() {
  var authFactory = angular.module('authFactory', []);

  authFactory.factory('Auth', ['$cookies', '$rootScope', '$http',
    '$location',
    function($cookies, $rootScope, $http, $location) {
      $rootScope.currentUser = $cookies.get('user') || null;

      return {
        login: (user) => {
          $http.post('/login', user)
            .then((response) => {
              $cookies.put('user', response.data.username);
              $rootScope.currentUser = response.data.username;
              $rootScope.messages = response.data.messages;
              $location.path('/');
            })
            .catch((error) => {
              $rootScope.messages = error.data.messages;
            });
        },
        logout: () => {
          $http.get('/logout')
            .then((response) => {
              $cookies.remove('user');
              $rootScope.currentUser = null;
              $rootScope.messages = response.data.messages;
            })
            .catch((error) => {
              $rootScope.messages = error.data.messages;
            });
        }
      };
    }
  ]);
})();
