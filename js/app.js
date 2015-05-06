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