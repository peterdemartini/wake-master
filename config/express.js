'use strict';

var express = require('express'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    config = require('./config'),
    consolidate = require('consolidate');

module.exports = function(app){
    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(compression({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Set the template engine to .html
    app.engine('html', consolidate.swig);

    app.set('view engine', 'html');

    app.locals.app = config.app;

    // Enable JSONP
    app.enable('jsonp callback');

    // Fix for swig crash
    app.locals.cache = 'memory';
    // The cookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    /*
    // Express/Mongo Session Storage
    app.use(express.session({
        secret: config.sessionSecret,
        store: new mongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        })
    }));
    */

    app.use(express.static(config.root_dir + 'public/'));

    var views = config.views_dir;
    app.set('views', views);

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan({ format : 'dev' }));
    }
};
