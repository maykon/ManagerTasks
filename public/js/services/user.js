(function() {
  var userFactory = angular.module('userFactory', ['ngResource']);

  userFactory.factory('User', ['$resource',
    function($resource) {
      return $resource('/users/:id', null, {
        update: {
          method: 'PUT'
        },
        last_users: {
          method: 'GET',
          params: {
            last: true
          }
        }
      });
    }
  ]);
})();
