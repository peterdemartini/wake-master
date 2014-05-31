'use strict';

angular.module('main.grades')
    .controller('GradesCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
        function ($scope, $routeParams, $http, $location, Global) {
            $scope.global = Global;
        }
    ]);
