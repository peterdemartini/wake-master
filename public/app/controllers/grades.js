'use strict';

angular.module('main.grades')
    .controller('GradesCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
        function ($scope, $routeParams, $http, $location, Global) {
            $scope.global = Global;

            $scope.grades = [];

            $scope.find = function(){
                $http.get('/grades')
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.grades = res;
                });
            };

            $scope.findOne = function(){
                $http.get('/grades/' + $routeParams.gradeId)
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.grade = res;
                });
            };

            $scope.goToGrade = function(grade){
                $location.path('/grades/' + grade._id);
            };
        }
    ]);
