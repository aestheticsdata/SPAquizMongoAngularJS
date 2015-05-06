// app.js

angular.module('SPAquiz', ['SPAquiz.controllers', 'SPAquiz.services', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {


        $stateProvider

            .state('login', {
                url         : '/login',
                templateUrl : 'partials/login.html',
                controller  : 'LoginController'
            })

            .state('404', {
                url         : '/404',
                templateUrl : 'partials/404.html'
            });

        //$urlRouterProvider.otherwise('/404');
    })

    .run(function ($state) {
        $state.go('login');
    });