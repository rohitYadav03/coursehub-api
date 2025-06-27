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

const EnrollmentModel = mongoose.model("enrollment", enrollmentSchema);

module.exports = { EnrollmentModel };