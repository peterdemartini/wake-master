'use strict';

angular.module('main').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/index.html'
            })
            .when('/instructions', {
                templateUrl: '/views/instructions.html'
            })
            .when('/login', {
                templateUrl: '/views/login.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
