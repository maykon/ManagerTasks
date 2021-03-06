(function() {
  var projectFactory = angular.module('projectFactory', ['ngResource']);

  projectFactory.factory('Project', ['$resource',
    function($resource) {
      return $resource('/projects/:id', null, {
        update: {
          method: 'PUT'
        },
        last_projects: {
          method: 'GET',
          params: {
            last: true
          }
        }
      });
    }
  ]);
})();
