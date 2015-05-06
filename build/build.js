//ControllerNS.js

angular.module('SPAquiz.controllers', []);
//loginController.js

angular.module('SPAquiz.controllers').controller('LoginController', LoginController);

function LoginController($scope) {

    $scope.login = 'your login';
}
//ServicesNS.js

angular.module('SPAquiz.services', []);
//loginService.js

angular.module('SPAquiz.services').factory('LoginService', LoginService);

function LoginService() {
    return {};
}
// app.js

angular.module('SPAquiz', ['SPAquiz.controllers', 'SPAquiz.services', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('login', {
                url:         '/login',
                templateUrl: 'partials/login.html',
                controller:  'LoginController'
            })
    });