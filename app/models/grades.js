'use strict';
/******
* Grade Model
******/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment'),
    config = require('../../config/config');

// Schema
var GradeSchema = new Schema({
    grade : {
        type: String,
        required: true,
        enum :[
            'A',
            'B',
            'C',
            'D',
            'F',
            'I',
            'U'
        ]
    },
    snoozes : {
        type : Number,
        required : true,
        default : 0
    },
    start : {
        type : Date,
        required : true,
        default : Date.now
    },
    end : {
        type : Date,
        required : true,
        default : Date.now
    },
    created : {
        type : Date,
        required : true,
        default : Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

// Set virtual password
GradeSchema
.virtual('motivation')
.get(function() {
    return config.grades[this.grade] || config.grades.U;
});

GradeSchema.methods = {
    calculate : function() {
        var snzs = this.snoozes;
        var secs = moment(this.start).unix() - moment(this.end).unix();
        if(snzs === 0 && secs < 60)
            return 'A'; // Wake up first try
        else if(snzs === 1 && secs < 12 * 60)
            return 'B'; // 1 snooze and less than 12 minutes
        else if(snzs === 2 && secs < 22 * 60)
            return 'C'; // 2 snooze and less than 22 minutes
        else if(snzs >= 3 && snzs <= 5 && secs < 60 * 60)
            return 'D'; // 3 - 5 snoozes and less than 1 hour
        else if(snzs && secs)
            return 'F'; // Any snoozes
        else
            return 'I'; // Not enough data
    }
};

mongoose.model('Grade', GradeSchema);
