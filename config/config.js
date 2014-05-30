'use strict';

var _ = require('lodash');

var root_dir = __dirname + '/../';

var config = {
    root_dir : root_dir,
    views_dir : root_dir + 'app/views',
    app : {
        name : 'Wake Master',
        description : 'An #IoT Alarm Clock powered by Skynet.im and Node.js'
    },
    port : process.env.PORT || 3000,
    sessionSecret : 'CHEESEBURGERSKILLPEOPLE123'
};

var env = {
    development : {
		db: 'mongodb://localhost/wake-master-dev',
        facebook: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://localhost:' + config.port + '/auth/facebook/callback'
        },
        twitter: {
            clientID: 'CONSUMER_KEY',
            clientSecret: 'CONSUMER_SECRET',
            callbackURL: 'http://localhost:' + config.port + '/auth/twitter/callback'
        },
        github: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://localhost:' + config.port + '/auth/github/callback'
        }
    },
    production : {
    	db: process.env.MONGOHQ_URL || 'mongodb://localhost/wake-master',
        facebook: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://wake-master.herokuapp.com/auth/facebook/callback'
        },
        twitter: {
            clientID: 'CONSUMER_KEY',
            clientSecret: 'CONSUMER_SECRET',
            callbackURL: 'http://wake-master.herokuapp.com/auth/twitter/callback'
        },
        github: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://wake-master.herokuapp.com/auth/github/callback'
        }
    }
};

if(env[process.env.NODE_ENV]){
    config = _.extend(config, env[process.env.NODE_ENV]);
}

module.exports = config;
