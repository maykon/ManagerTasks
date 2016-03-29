(function() {
  var interceptorFactory = angular.module('interceptorFactory', []);

  interceptorFactory.factory('Interceptor', ['$rootScope', '$location', '$q',
    function($rootScope, $location, $q) {
      var interceptor = {
        response: function(resposta) {
          if ((/error\.html/.test(resposta.config.url)) &&
            (!$rootScope.error)) {
            $location.path('/');
          }
          return $q.resolve(resposta);
        },
        responseError: function(resposta) {
          switch (resposta.status) {
            case 401:
            case 400:
            case 500:
              $rootScope.goToErro(resposta.data.error);
              break;
            case -1:
              $rootScope.showMessage('Não foi possível conectar ao servidor!');
              break;
          }
          return $q.reject(resposta);
        }
      }
      return interceptor;
    }
  ]);
})();
