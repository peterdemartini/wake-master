'use strict';
/******
* Alarm Model
******/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');

// Schema
var AlarmSchema = new Schema({
    name : {
        type : String,
        required : true,
        default : ''
    },
    active : {
        type : Boolean,
        default : true
    },
    // Days of the week you want it to trigger [1,2,3,4,5,6,7]
    days : [{
        type : Number,
        required : true,
        default : 0
    }],
    // Hour (Military Time)
    hour : {
        type : Number,
        required : true,
        default : 0
    },
    // Minute 0-60
    minute : {
        type : Number,
        required : true,
        default : 0
    },
    // Can Snooze the alarm
    snooze : {
        type : Boolean,
        default : true
    },
    skynet_uuid : {
        type : String,
        default : ''
    },
    skynet_token : {
        type : String,
        default : ''
    },
    updated : [{
        type : Date,
        default : Date.now
    }],
    created : {
        type : Date,
        default : Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
}, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
});

// A virtual for getting the next alarm date
AlarmSchema
.virtual('next')
.get(function() {
    // TODO
    return moment();
});

AlarmSchema.pre('save', function(next){
    this.updated = this.updated && this.updated.length ? this.updated.slice(0, 5) : [];
    next();
});

mongoose.model('Alarm', AlarmSchema);
