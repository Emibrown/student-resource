var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;


var studentSchema = Schema(
    {
        fullName: {type: String, required: true},
        matricNo: {type: String, required: true, unique: true},
        department: {type: String, required: true},
        faculty: {type: String, required: true},
        school:{type: String, required: true},
        gender: {type: String, required: true},
        avatar: {
            name: String,
            path: String
        },
        createdAt: {type: Date, default: Date.now},
    }
)

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;