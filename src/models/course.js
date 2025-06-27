const mongoose = require("mongoose");
const validator = require("validator");

// This course schema is designed for instructors to create and manage their courses.
const courseSchema = new mongoose.Schema({
title : {
         type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 50 
}, 
description : {
 type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 100 
}, 
price : {
         type : Number,
        required : true,
}, 
thumbnail : {
 type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 100 ,
        validate(val){
            if(!validator.isURL(val)){
throw new Error("Enter a valid image URL");
            }
        }
}, 
category : {
 type : String,
        required : true,
        trim : true,
        minlength : 3,
        maxlength : 50,
        enum: ["Web", "Mobile", "Data Science", "AI", "DevOps","web3", "Other"],
       default: "Other"
 
}, 
instructor  : {
  type : mongoose.Schema.Types.ObjectId,
        required : true,
        // ref ⇒ “Yeh ID kis collection ki hai, bata do.”
     ref : "user",

}
}, {timestamps : true});

const CourseModel = new mongoose.model("course", courseSchema);

module.exports = { CourseModel }