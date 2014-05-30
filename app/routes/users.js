'use strict';
var users = require('../controllers/users');

module.exports = function (app, passport) {

    app.route('/logout')
        .get(users.signout);
    app.route('/users/me')
        .get(users.me);

    // Setting up the users api
    app.route('/register')
        .post(users.create);

    // Setting up the userId param
    app.param('userId', users.user);

    // AngularJS route to check for authentication
    app.route('/loggedin')
        .get(function(req, res) {
            res.send(req.isAuthenticated() ? req.user : '0');
        });

    app.route('/login')
        .post(passport.authenticate('local', {
            failureFlash: true
        }), function(req, res) {
            res.send({
                user: req.user,
                redirect: (req.user) ? req.get('referer') : false
            });
        });

    // Setting the facebook oauth routes
    app.route('/auth/facebook')
        .get(passport.authenticate('facebook', {
            scope: ['email', 'user_about_me'],
            failureRedirect: '#!/login'
        }), users.signin);

    app.route('/auth/facebook/callback')
        .get(passport.authenticate('facebook', {
            failureRedirect: '#!/login'
        }), users.authCallback);

    // Setting the github oauth routes
    app.route('/auth/github')
        .get(passport.authenticate('github', {
            failureRedirect: '#!/login'
        }), users.signin);

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            failureRedirect: '#!/login'
        }), users.authCallback);

    // Setting the twitter oauth routes
    app.route('/auth/twitter')
        .get(passport.authenticate('twitter', {
            failureRedirect: '#!/login'
        }), users.signin);

    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            failureRedirect: '#!/login'
        }), users.authCallback);
};
