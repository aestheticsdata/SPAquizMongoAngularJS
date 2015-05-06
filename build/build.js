//ControllerNS.js

angular.module('SPAquiz.controllers', []);
//loginController.js

angular.module('SPAquiz.controllers').controller('LoginController', LoginController);

function LoginController($scope) {

    $scope.login = 'your login hello world';
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
    .config(function ($stateProvider) {
        $stateProvider

            .state('login', {
                url:         '/login',
                template: '<div>login screen</div>',
                controller:  'LoginController'
            })
    });