'use strict';

var md = require('../middlewares/index'),
    alarms = require('../controllers/alarms');

var hasAuthorization = function(req, res, next) {
    if (req.alarms.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.route('/alarms')
        .get(alarms.list)
        .post(md.auth, alarms.create);

    app.route('/alarms/:alarmId')
        .get(alarms.show)
        .put(md.auth, hasAuthorization, alarms.edit)
        .delete(md.auth, hasAuthorization, alarms.destroy);

    app.param('alarmId', alarms.alarm);
};
