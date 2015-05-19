//ControllerNS.js

angular.module('SPAquiz.controllers', []);
//DirectivesNS.js

angular.module('SPAquiz.directives', []);
//ServicesNS.js

angular.module('SPAquiz.services', []);
// questions.js

angular.module('SPAquiz.directives').directive('hxfQuestions', hxfQuestions);

function hxfQuestions() {
    return {
        restrict: 'E',
        templateUrl: '../templates/questionsPanel.html',
        scope: {
            entries         : '=model',
            checkedQuestion : '&checkedquestion',
            onRadioChanged  : '&onradiochanged'
        }
    }
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
// QuestionsController.js

angular.module('SPAquiz.controllers').controller('QuestionsController', QuestionsController);

function QuestionsController($scope, $state, $stateParams, QuestionsService) {


    var currentIndex    = $stateParams.idx,
        questionsLength = QuestionsService.getQuestions().length;




    $scope.isPrevDisabled = (parseInt(currentIndex) === 0);
    $scope.isNextDisabled = false;

    $scope.questions = QuestionsService.getQuestions(currentIndex);
    $scope.currentQuestionIdx = parseInt(currentIndex, 10) + 1; // array 0 based
    $scope.totalQuestionIdx   = questionsLength;




    $scope.checkedQuestion = function () {
        console.log('checkedQuestion');
        return QuestionsService.currentAnswers[currentIndex] === -1 ? 0 : QuestionsService.currentAnswers[currentIndex];
    };

    $scope.onRadioChanged = function (idx) {
        QuestionsService.currentAnswers[currentIndex] = idx;
        console.log('radio has changed : ', idx);
    };

    $scope.prev = function () {
        $state.go('quiz', {idx:currentIndex === 0 ? currentIndex : parseInt(currentIndex-1)});
    };

    $scope.next = function () {
        if (parseInt(currentIndex) === questionsLength-1) {
            $state.go('score');
        } else {
            $state.go('quiz', {idx:parseInt(currentIndex)+1});
        }
    }
}
// ScoreController.js

angular.module('SPAquiz.controllers').controller('ScoreController', ScoreController);

function ScoreController($scope, QuestionsService) {

    $scope.score = QuestionsService.getScore();
}
// ConstantService.js

angular.module('SPAquiz.services').constant('CONFIG', {
        loginUrl : 'http://www.hexafarm.com:8990/login',
        debug    : false
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

        if (CONFIG.debug) {

            return $http.get('../mock_data/questions.json')

        } else {

            return $http.post(
                    CONFIG.loginUrl, {
                        username : user,
                        password : pass
                    });
        }
    }
}
// QuestionsService.js

angular.module('SPAquiz.services').factory('QuestionsService', QuestionsService);

function QuestionsService() {

    var qs = {
        questions      : [],
        currentAnswers : [],
        score          : 0,
        setScore       : _setScore,
        getScore       : _getScore,
        setQuestions   : _setQuestions,
        getQuestions   : _getQuestions
    };

    return qs;




//  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
//  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _setQuestions(questions) {

        console.log('QuestionsService::setQuestions : ' , questions);

        qs.questions = questions;

        for (var i=0; i<qs.questions.length; i++) {
            qs.currentAnswers.push(-1); // -1 is a flag to check if a radio button has been changed
        }

        return true;
    }


    function _getQuestions(idx) {

        return idx ? qs.questions[idx] : qs.questions;
    }


    function _setScore(score) {

        qs.score = score;

        return true;
    }


    function _getScore(){

        for(var i=0; i<qs.questions.length; i++) {
            (qs.currentAnswers[i] === -1) && (qs.currentAnswers[i] = 0);
            console.log('qs.currentAnswers', qs.currentAnswers);
            (qs.questions[i].correctAnswer === qs.currentAnswers[i]) && qs.score++;
        }
        return qs.score;
    }
}
// app.js

angular.module('SPAquiz', ['SPAquiz.directives', 'SPAquiz.controllers', 'SPAquiz.services', 'ui.router'])
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

            .state('score', {
                url         : '/score',
                templateUrl : 'partials/score.html',
                controller  : "ScoreController"
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