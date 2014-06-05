'use strict';

angular.module('main.dashboard')
    .controller('DashboardCtrl', ['$scope', '$routeParams', '$interval', '$http', '$location', 'Global',
        function ($scope, $routeParams, $interval, $http, $location, Global) {
            $scope.global = Global;

            $scope.time = moment().format('h:mm:ss A');

            $scope.clock = function(){

                $interval(function(){
                    $scope.time = moment().format('h:mm:ss A');
                }, 100, 0, true);

            };

            $scope.init = function(){
                $scope.clock();

                $('#clock').flowtype({
                    fontRatio : 6
                });
            };
        }
    ]);
