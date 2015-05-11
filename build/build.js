//ControllerNS.js

angular.module('SPAquiz.controllers', []);
//ServicesNS.js

angular.module('SPAquiz.services', []);
// QuestionsController.js

angular.module('SPAquiz.controllers').controller('QuestionsController', QuestionsController);

function QuestionsController($scope, $stateParams, QuestionsService) {

    console.log('$stateParams : ', $stateParams);

    console.log('QuestionsService : ', QuestionsService.getQuestions($stateParams.idx));

    $scope.questions = QuestionsService.getQuestions($stateParams.idx);
}
//loginController.js

angular.module('SPAquiz.controllers').controller('LoginController', LoginController);

function LoginController($scope, $state, LoginService, QuestionsService) {

    $scope.login = function () {

        var user = document.querySelector('#userfield').value,
            pass = document.querySelector('#passfield').value;


        console.log('submit form');

        LoginService.login(user, pass)
            .success(function (res) {
                console.log(res);

                QuestionsService.setQuestions(res);

                $state.go('quiz', {idx:0}); // go to first question
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
// ConstantService.js

angular.module('SPAquiz.services').constant('CONFIG', {
        loginUrl: 'http://www.hexafarm.com:8990/login'
    });

//loginService.js

angular.module('SPAquiz.services').factory('LoginService', LoginService);

function LoginService($http, CONFIG) {

    var ws = {
        login: _login
    };

    return ws;




//  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
//  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _login(user, pass) {
        return $http.post(
            CONFIG.loginUrl, {
            username : user,
            password : pass
        });
    }
}
// QuestionsService.js

angular.module('SPAquiz.services').factory('QuestionsService', QuestionsService);

function QuestionsService() {

    var qs = {
        questions    : [],
        setQuestions : _setQuestions,
        getQuestions : _getQuestions
    };

    return qs;




//  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
//  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _setQuestions(questions) {

        console.log('QuestionsService::setQuestions : ' , questions);

        qs.questions = questions;
        return true;
    }

    function _getQuestions(idx) {
        return qs.questions[idx];
    }
}
// app.js

angular.module('SPAquiz', ['SPAquiz.controllers', 'SPAquiz.services', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {


        $stateProvider

            .state('login', {
                url         : '/login',
                templateUrl : 'partials/login.html',
                controller  : 'LoginController'
            })

            .state('quiz', {
                url         : '/questions/:idx',
                templateUrl : 'partials/questions.html',
                controller  : "QuestionsController"
            })

            .state('404', {
                url         : '/404',
                templateUrl : 'partials/404.html'
            });

        $urlRouterProvider.otherwise('/login');
    })

    .run(function ($state) {
        $state.go('login');
    });