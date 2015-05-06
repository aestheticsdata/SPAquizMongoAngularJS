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