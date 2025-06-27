const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    },
     courseId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "course"
    },
    
}, {timestamps : true}) ;

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true })
// index → speeds up queries
// compound index → uses multiple fields in left-to-right order
// { unique: true } → enforces one-per-combination rule
// Why use it?	To stop multiple enrollments in same course by the same user

const EnrollmentModel = mongoose.model("enrollment", enrollmentSchema);

module.exports = { EnrollmentModel };