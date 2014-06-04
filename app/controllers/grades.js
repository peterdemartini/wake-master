'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Grade = mongoose.model('Grade');


exports.grade = function(req, res, next, id) {
    Grade.findById(id, function(err, grade) {
        if (err) return next(err);
        if (!grade) return next(new Error('Failed to load grade ' + id));
        req.grade = grade;
        next();
    });
};

exports.create = function(req, res){
    var grade = new Grade(req.body);
    grade.user = req.user;

    grade.save(function(err){
        if(err){
            return res.status(400).jsonp({
                error : err.errors,
                msg : 'Unable to create grade'
            });
        }
        res.jsonp(grade);
    });
};


exports.list = function(req, res){
    Grade
    .find({})
    .limit(20)
    .exec(function(err, grades){
        if(err){
            return res.status(400).jsonp({
                error : err.errors,
                msg : 'Unable to find grades'
            });
        }

        res.jsonp(grades);
    });
};

exports.destroy = function(req, res) {
    var grade = req.grade;

    grade.remove(function(err) {
        if (err) {
            return res.status(400).jsonp({
                error : err.errors,
                msg : 'Unable to delete grade'
            });
        } else {
            res.jsonp(grade);
        }
    });
};

exports.show = function(req, res){
    res.jsonp(req.grade || {});
};
