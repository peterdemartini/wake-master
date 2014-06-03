'use strict';

var _ = require('lodash'),
    fs = require('fs');

var root_dir = __dirname + '/../';

var path = root_dir + 'env.json';
if(fs.existsSync(path)){
    var envVars = require(path);
    process.env = _.extend(process.env, envVars);
}

var config = {
    root_dir : root_dir,
    views_dir : root_dir + 'app/views',
    app : {
        name : 'Wake Master',
        description : 'An #IoT Alarm Clock powered by Skynet.im and Node.js'
    },
    port : process.env.PORT || 3000,
    sessionSecret : 'CHEESEBURGERSDONTKILL',
    sessionCollection : 'sessions',
    grades : {
        A : 'You are the best!',
        B : 'Oh boy! Decent job.',
        C : 'Well, not bad... Better luck next time.',
        D : 'Ha, why did you even try?',
        F : 'You failed. You wish you were cool.',
        I : 'Your grade is incomplete',
        U : 'Did you cheat?'
    }
};

var env = {
    development : {
		db: 'mongodb://localhost/wake-master-dev',
        facebook: {
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: 'http://localhost:' + config.port + '/auth/facebook/callback'
        },
        twitter: {
            clientID: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
            callbackURL: 'http://localhost:' + config.port + '/auth/twitter/callback'
        },
        github: {
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: 'http://localhost:' + config.port + '/auth/github/callback'
        }
    },
    production : {
    	db: process.env.MONGOHQ_URL || 'mongodb://localhost/wake-master',
        facebook: {
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: 'http://wakemaster.io/auth/facebook/callback'
        },
        twitter: {
            clientID: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
            callbackURL: 'http://wakemaster.io/auth/twitter/callback'
        },
        github: {
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: 'http://wakemaster.io/auth/github/callback'
        }
    }
};

if(env[process.env.NODE_ENV]){
    config = _.extend(config, env[process.env.NODE_ENV]);
}

module.exports = config;
