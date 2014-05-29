'use strict';

angular.module('main.index').controller('InstructionCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
    function ($scope, $routeParams, $http, $location, Global) {
        $scope.global = Global;
    }
]);
