'use strict';

exports.index = function(req, res){
    console.log(req.user);
    res.render('index.html', {
        user : req.user
    });
};
