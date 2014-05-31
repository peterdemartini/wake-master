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
            .when('/grades', {
                templateUrl: '/views/grades/index.html'
            })
            .when('/dashboard', {
                templateUrl: '/views/dashboard.html'
            })
            .when('/alarm', {
                templateUrl: '/views/alarm/index.html'
            })
            .when('/login', {
                templateUrl: '/views/login.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
