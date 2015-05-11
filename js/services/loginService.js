//loginService.js

angular.module('SPAquiz.services').factory('LoginService', LoginService);

function LoginService($http, CONFIG) {

    var ws = {
        login: _login
    };

    return ws;

    function _login(user, pass) {
        return $http.post(
            CONFIG.loginUrl, {
            username : user,
            password : pass
        });
    }
}