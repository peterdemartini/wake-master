'use strict';

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = 'development';
}

var express = require('express'),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    db = mongoose.connect(config.db),
    fs = require('fs');

console.log('Initializing ' + config.app.name + ' into the matrix.');

console.log('Enviroment :: ' + process.env.NODE_ENV);

var app = express();

// Require models
(function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        }
    });
})('./app/models');

var passport = require('passport');

require('./config/passport')(passport);

require('./config/express')(app, db, passport);


// Require routes
(function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app, passport);
            }
        }
    });
})('./app/routes');

app.listen(config.port);

console.log('Listening on port ' + config.port);
