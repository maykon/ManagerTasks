(function() {
  var dashboardCtrl = angular.module('dashboardCtrl', []);

  dashboardCtrl.controller('DashboardCtrl', ['$scope', 'Project', 'User',
    function($scope, Project, User) {
      $scope.projects = null;
      $scope.users = null;

      $scope.findLastProjects = () => {
        Project.last_projects().$promise
          .then((response) => $scope.projects = response.projects);
      };

      $scope.findLastUsers = () => {
        User.last_users().$promise
          .then((response) => $scope.users = response.users);
      };

      $scope.init = () => {
        $scope.findLastProjects();
        $scope.findLastUsers();
      };
      $scope.init();
    }
  ]);

})();
