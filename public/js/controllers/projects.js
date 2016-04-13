(function() {
  var projectCtrl = angular.module('projectCtrl', []);

  projectCtrl.constant('projectsPath', {
    projects_path: '#/projects',
    new_project_path: '#/projects/new'
  });

  projectCtrl.controller('ProjectListCtrl', ['$rootScope', '$scope',
    'Project', 'projectsPath', '$route',
    function($rootScope, $scope, Project, projectsPath, $route) {
      $scope.projects = [];
      $scope.search = '';
      $scope.dateFilter = $rootScope.dateFilterBr;
      $scope.projects_path = projectsPath.projects_path;
      $scope.new_project_path = projectsPath.new_project_path;

      $scope.findAll = () => {
        Project.query().$promise
          .then((response) => $scope.projects = response);
      };

      $scope.deleteProject = (project) => {
        Project.delete({
            id: project._id
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

  projectCtrl.controller('ProjectNewCtrl', ['$rootScope', '$scope',
    '$location', 'Project', 'projectsPath',
    function($rootScope, $scope, $location, Project, projectsPath) {
      $scope.project = new Project();
      $scope.projects_path = projectsPath.projects_path;

      $scope.saveProject = () => {
        $scope.project.$save()
          .then((response) => {
            $rootScope.showProjectCount();
            $rootScope.showMessage(response.message);
            $location.path('/projects');
          });
      };
    }
  ]);

  projectCtrl.controller('ProjectShowCtrl', ['$rootScope', '$scope',
    '$routeParams', 'Project', 'projectsPath',
    function($rootScope, $scope, $routeParams, Project,
      projectsPath) {
      $scope.project = null;
      $scope.projects_path = projectsPath.projects_path;
      $scope.dateFilter = $rootScope.dateFilterBr;

      $scope.findProject = (id) => {
        Project.get({
            id: id
          }).$promise
          .then((response) => $scope.project = response.project);
      };

      $scope.init = () => {
        $scope.findProject($routeParams.id);
      };
      $scope.init();
    }
  ]);

  projectCtrl.controller('ProjectEditCtrl', ['$rootScope', '$scope',
    '$location', '$routeParams', 'Project', 'projectsPath',
    function($rootScope, $scope, $location, $routeParams, Project,
      projectsPath) {
      $scope.project = null;
      $scope.projects_path = projectsPath.projects_path;

      $scope.findProject = (id) => {
        Project.get({
            id: id
          }).$promise
          .then((response) => $scope.project = response.project);
      };

      $scope.updateProject = () => {
        Project.update({
            id: $scope.project._id
          }, $scope.project).$promise
          .then((response) => {
            $rootScope.showMessage(response.message);
            $location.path('/projects');
          });
      };

      $scope.init = () => {
        $scope.findProject($routeParams.id);
      };
      $scope.init();
    }
  ]);
})();
