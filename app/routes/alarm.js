'use strict';

var md = require('../middlewares/index'),
    alarms = require('../controllers/alarms');

var hasAuthorization = function(req, res, next) {
    if (req.alarm.user._id.toString() !== req.user._id.toString()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.route('/alarms')
        .get(md.auth, alarms.list)
        .post(md.auth, alarms.create);

    app.route('/alarms/:alarmId')
        .get(alarms.show)
        .put(md.auth, hasAuthorization, alarms.edit)
        .delete(md.auth, hasAuthorization, alarms.destroy);

    app.param('alarmId', alarms.alarm);
};
