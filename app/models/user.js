'use strict';
/******
* User Model - based off of http://mean.io's user model
******/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

// has value
var hasValue = function(val) {
    return (
         this.login_source &&
         this.login_source !== 'local'
     ) || val.length;
};

// Schema
var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: [
            hasValue,
            'Name cannot be blank'
        ]
    },
    email: {
        type: String,
        required: true,
        match: [
            /.+\@.+\..+/,
            'Please enter a valid email'
        ],
        validate: [
            hasValue,
            'Email cannot be blank'
        ]
    },
    username: {
        type: String,
        unique: true,
        validate: [
            hasValue,
            'Username cannot be blank'
        ]
    },
    password_hash: {
        type: String,
        validate: [
            hasValue,
            'Password cannot be blank'
        ]
    },
    salt: String,
    login_source: {
        type: String,
        default: 'local'
    },
    facebook: {},
    twitter: {},
    github: {}
});

// Set virtual password
UserSchema
.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = this.createSalt();
    this.password_hash = this.hashPassword(password);
})
.get(function() {
    return this._password;
});

// Before Save
UserSchema.pre('save', function(next) {
    if (this.login_source === 'local' && this.password && !this.password.length){
        return next(new Error('Invalid Password'));
    }
    next();
});

UserSchema.methods = {
    createSalt : function() {
        return crypto.randomBytes(16).toString('base64');
    },
    hashPassword : function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    },
    authenticate: function(password) {
        return this.hashPassword(password) === this.password_hash;
    }
};

mongoose.model('User', UserSchema);
