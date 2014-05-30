'use strict';
//Used for setting up rest endpoints
angular.module('main.users')
    .factory('User', ['$resource', function($resource) {
    return $resource('users/:userId', {
        profileId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
