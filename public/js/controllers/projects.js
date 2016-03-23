(function() {
  var projectCtrl = angular.module('projectCtrl', []);

  projectCtrl.constant('projectsPath', {
    projects_path: '#/projects',
    new_project_path: '#/projects/new'
  });

  projectCtrl.controller('ProjectListCtrl', ['$rootScope', '$scope',
    '$location', 'Project', 'projectsPath', '$route',
    function($rootScope, $scope, $location, Project, projectsPath, $route) {
      $scope.projects = [];
      $scope.projects_path = projectsPath.projects_path;
      $scope.new_project_path = projectsPath.new_project_path;

      $scope.findAll = () => {
        Project.get({}).$promise
          .then((response) => $scope.projects = response.projects)
          .catch((error) => {
            $rootScope.goToErro(error.data.error);
          });
      };

      $scope.deleteProject = (project) => {
        Project.delete({
          id: project._id
        }).$promise
          .then((response) => {
            $rootScope.messages = response.messages;
            $route.reload();
          })
          .catch((error) => {
            $rootScope.goToErro(error.data.error);
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
            $rootScope.messages = response.messages;
            $location.path('/projects');
          })
          .catch((error) => {
            $rootScope.goToErro(error.data.error);
          });
      };
    }
  ]);

  projectCtrl.controller('ProjectShowCtrl', ['$rootScope', '$scope',
    '$location', '$routeParams', 'Project', 'projectsPath',
    function($rootScope, $scope, $location, $routeParams, Project,
      projectsPath) {
      $scope.project = null;
      $scope.projects_path = projectsPath.projects_path;

      $scope.findProject = (id) => {
        Project.get({
          id: id
        }).$promise
          .then((response) => $scope.project = response.project)
          .catch((error) => {
            $rootScope.goToErro(error.data.error);
          });
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
          .then((response) => $scope.project = response.project)
          .catch((error) => {
            $rootScope.goToErro(error.data.error);
          });
      };

      $scope.updateProject = () => {
        Project.update({
          id: $scope.project._id
        }, $scope.project).$promise
          .then((response) => {
            $rootScope.messages = response.messages;
            $location.path('/projects');
          })
          .catch((error) => {
            $rootScope.goToErro(error.data.error);
          });
      };

      $scope.init = () => {
        $scope.findProject($routeParams.id);
      };
      $scope.init();
    }
  ]);
})();
