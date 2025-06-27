const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 50 
    },
    email : {
         type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minlength : 3,
        maxlength : 50,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Enter a valid Email");
            }
        }
    },
    password : {
        type : String,
        required: true,
        minlength : 8,
        maxlength : 200,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error("Enter a strong Password");
            }
        }
    },
    role : {
        type : String,
        enum : ["student", "instructor"],
        default : "student",
    }
}, {timestamps : true})

const UserModel = new mongoose.model("user", userSchema);

module.exports= { UserModel };