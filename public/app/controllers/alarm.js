'use strict';

angular.module('main.alarm')
    .controller('AlarmCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
        function ($scope, $routeParams, $http, $location, Global) {
            $scope.global = Global;
        }
    ]);
