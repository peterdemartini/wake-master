'use strict';

angular.module('main.users')
    .controller('LoginCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
        function ($scope, $routeParams, $http, $location, Global) {
            $scope.global = Global;

            $scope.type = 'login';

            $scope.selectLoginType = function (type) {
                $scope.type = type;
            };

            $scope.loginUser = {};

            $scope.login = function () {
                $http.post('/login', {
                    email: $scope.loginUser.email,
                    password: $scope.loginUser.password
                })
                    .success(function (response) {
                        // authentication OK
                        $scope.loginError = 0;
                        if (response.redirect) {
                            if (window.location.href === response.redirect) {
                                //This is so an admin user will get full admin page
                                window.location.reload();
                            } else {
                                window.location = response.redirect;
                            }
                        } else {
                            $location.path('/dashboard');
                        }
                    })
                    .error(function () {
                        $scope.loginerror = 'Authentication failed.';
                    });
            };

            $scope.signupUser = {};

            $scope.register = function() {
                $scope.usernameError = null;
                $scope.signupError = null;
                $http.post('/register', {
                    email: $scope.signupUser.email,
                    password: $scope.signupUser.password,
                    confirm_password: $scope.signupUser.confirm_password,
                    username: $scope.signupUser.username,
                    name: $scope.signupUser.name
                })
                    .success(function() {
                        // authentication OK
                        $scope.signupError = 0;
                        $location.path('/dashboard');
                    })
                    .error(function(error) {
                        $scope.signupError = error;
                    });
            };
        }
    ]);
