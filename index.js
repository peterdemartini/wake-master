'use strict';

var express = require('express'),
    config = require('./config/config'),
    fs = require('fs');

var app = express();

require('./config/express')(app);

// Require routes
(function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app);
            }
        }
    });
})('./app/routes');

app.listen(config.port);

console.log('Listening on port ' + config.port);
