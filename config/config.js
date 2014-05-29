'use strict';

var root_dir = __dirname + '/../';

var config = {
    root_dir : root_dir,
    views_dir : root_dir + 'app/views',
    app : {
        name : 'Wake Master',
        description : 'An #IoT Alarm Clock powered by Skynet.im and Node.js'
    },
    port : process.env.PORT || 3000
};

module.exports = config;
