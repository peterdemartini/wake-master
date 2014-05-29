'use strict';
var ctrl = require('../controllers/index');

module.exports = function(app){
    app.get('/', ctrl.index);
};
