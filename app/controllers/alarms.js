'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Alarm = mongoose.model('Alarm');


exports.alarm = function(req, res, next, id) {
    Alarm.findById(id)
    .populate('user')
    .exec(function(err, alarm) {
        if (err) return next(err);
        if (!alarm) return next(new Error('Failed to load alarm ' + id));
        req.alarm = alarm;
        next();
    });
};

exports.create = function(req, res){
    var alarm = new Alarm(req.body);
    alarm.user = req.user;

    alarm.save(function(err){
        if(err){
            return res.status(400).jsonp({
                error : err.errors,
                msg : 'Unable to create alarm'
            });
        }
        res.jsonp(alarm);
    });
};

exports.edit = function(req, res){
    var alarm = req.alarm;

    alarm = _.extend(alarm, req.body);

    alarm.save(function(err){
        if(err){
            return res.status(400).jsonp({
                error : err.errors,
                msg : 'Unable to edit alarm'
            });
        }
        res.jsonp(alarm);
    });
};


exports.list = function(req, res){
    Alarm
    .find({
        user : req.user
    })
    .limit(20)
    .exec(function(err, alarms){
        if(err){
            return res.status(400).jsonp({
                error : err.errors,
                msg : 'Unable to find alarms'
            });
        }

        res.jsonp(alarms);
    });
};

exports.destroy = function(req, res) {
    var alarm = req.alarm;

    alarm.remove(function(err) {
        if (err) {
            return res.status(400).jsonp({
                error : err.errors,
                msg : 'Unable to delete alarm'
            });
        } else {
            res.jsonp(alarm);
        }
    });
};

exports.show = function(req, res){
    res.jsonp(req.alarm || {});
};
