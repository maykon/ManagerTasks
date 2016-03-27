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
    function link(scope) {
      scope.$on(scope.onActivate, () => {
        scope.$emit(scope.onHide);
      });
    };

    return {
      restrict: 'A',
      scope: {
        onActivate: '@',
        onHide: '@'
      },
      link: link
    };
  }]);

  bsComponents.component('bsNav', {
    restrict: 'E',
    transclude: true,
    templateUrl: '/js/components/bs-nav.html',
    bindings: {
      title: '@',
      url: '@'
    }
  });

  bsComponents.component('bsNavItem', {
    restrict: 'E',
    templateUrl: '/js/components/bs-nav-item.html',
    bindings: {
      items: '='
    },
    controller: function($scope, $location) {
      var ctrl = this;

      $scope.goLink = (index) => {
        ctrl.items.forEach((menu) => {
          menu.active = false;
        });
        menu = ctrl.items[index];
        menu.active = true;
        $location.path(menu.link);
      };
    }
  });

  bsComponents.component('bsFormLogin', {
    restrict: 'E',
    templateUrl: '/js/components/bs-form-login.html',
    bindings: {
      onLogin: '&',
      onLogout: '&',
      onRegister: '&',
      currentUser: '<',
      user: '='
    }
  });

  bsComponents.component('bsMessage', {
    restrict: 'E',
    templateUrl: '/js/components/bs-message.html',
    bindings: {
      message: '=',
      onClose: '&'
    }
  });

})();
