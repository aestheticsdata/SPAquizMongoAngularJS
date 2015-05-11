//loginController.js

angular.module('SPAquiz.controllers').controller('LoginController', LoginController);

function LoginController($scope, LoginService) {

    $scope.login = function () {

        var user = document.querySelector('#userfield').value,
            pass = document.querySelector('#passfield').value;


        console.log('submit form');

        LoginService.login(user, pass)
            .success(function (res) {
                console.log(res);
            })
            .error(function (res) {
                console.log(res);
                $scope.loginerror = true;
            });
    };

    $scope.onFocus = function (evt) {

        $scope.loginerror = false;
        evt.target.value = "";

    };

    $scope.loginerror = false;
}