'use strict';

var md = require('../middlewares/index'),
    grades = require('../controllers/grades');

var hasAuthorization = function(req, res, next) {
    if (req.grades.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.route('/grades')
        .get(grades.list)
        .post(md.auth, grades.create);

    app.route('/grades/:gradeId')
        .get(grades.show)
        .delete(md.auth, hasAuthorization, grades.destroy);

    app.param('gradeId', grades.grade);
};
