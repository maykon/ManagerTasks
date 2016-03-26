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
      var firstTime = false;

      function hide() {
        scope.clearMessage();
      };

      scope.$watch(attrs.bsHide, function(value) {
        if (!firstTime) {
          firstTime = true;
          return;
        }
        hide();
      });
    };

    return {
      restrict: 'A',
      link: link
    };
  }]);

  bsComponents.component('bsNav', {
    transclude: true,
    templateUrl: '/js/components/bs-nav.html',
    bindings: {
      title: '@',
      url: '@'
    }
  });

  bsComponents.component('bsNavItem', {
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
    templateUrl: '/js/components/bs-message.html',
    bindings: {
      message: '=',
      onClose: '&'
    }
  });

})();
