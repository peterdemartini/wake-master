'use strict';

angular.module('main.system').factory('Global', [

    function() {
        var obj = this;

        obj._data = {
            user: window.user || false,
            authenticated: !! window.user,
            app : window.app || false
        };

        return obj._data;
    }

]);
