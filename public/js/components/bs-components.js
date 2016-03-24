(function() {
  var bsComponents = angular.module('bsComponents', []);

  bsComponents.component('bsPanel', {
    transclude: true,
    templateUrl: '/js/components/bs-panel.html',
    bindings: {
      title: '@'
    }
  });

  bsComponents.directive('bsHide', ['$timeout', ($timeout) => {
    function link(scope, element, attrs) {
      var model,
        timeoutId;

      function hide() {
        scope.clear();
      };

      function timeToHide() {
        timeoutId = $timeout(hide, 5000);
      };

      scope.$watch(attrs.bsHide, function(value) {
        timeToHide();
      });

      element.on('$destroy', function() {
        $timeout.cancel(timeoutId);
      });
    };

    return {
      restrict: 'A',
      controller: ['$rootScope',
        function($rootScope) {
          $rootScope.clear = () => {
            $rootScope.messages = '';
          }
        }
      ],
      link: link
    };
  }]);
})();
