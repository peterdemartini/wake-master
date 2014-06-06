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
        enum :[
            'A',
            'B',
            'C',
            'D',
            'F',
            'I', // Incomplete
            'U'  // Unknown
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
    alarm: {
        type: Schema.ObjectId,
        ref: 'Alarm'
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

// Set virtual password
GradeSchema
.virtual('motivation')
.get(function() {
    return config.grades[this.grade] || config.grades.U;
});

GradeSchema
.virtual('minutes')
.get(function() {
    return  Math.round((moment(this.start).unix() - moment(this.end).unix()) * 60);
});

GradeSchema
.virtual('seconds')
.get(function() {
    return moment(this.start).unix() - moment(this.end).unix();
});

GradeSchema.pre('save', function(next){
    this.grade = this.calculate();
    next();
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
