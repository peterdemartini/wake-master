'use strict';

angular.module('main.users').controller('LoginCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
    function ($scope, $routeParams, $http, $location, Global) {
        $scope.global = Global;

        $scope.type = 'login';

        $scope.selectLoginType = function(type){
            $scope.type = type;
        };

        $scope.localLogin = function(){
            $http.post('/login',
                $scope.login)
                .success(function(){
                    $location.path('/');
                })
                .error(function(err){
                    console.log('Error logging in', err);
                });
        };

        $scope.localSignup = function(){
            $http.post('/register',
                $scope.signup)
                .success(function(){
                    $location.path('/');
                })
                .error(function(err){
                    console.log('Error signing up', err);
                });
        };
    }
]);
