const express = require("express");
const {connectDB} = require("./config/db.js");
const cookieParser  = require("cookie-parser");
const {authRouter} = require("./routes/auth.js");
const {profileRouter} = require("./routes/profile.js");
const {courseRouter} = require("./routes/courses.js");
const { userAuth } = require("./middlewares/userAuth.js");
const { CourseModel } = require("./models/course.js");
const { EnrollmentModel } = require("./models/enrollment.js")
const app = express ();

app.use(express.json())
app.use(cookieParser())

app.use("/auth",authRouter );
app.use("/profile",profileRouter );
app.use("/courses",courseRouter);

app.post("/enroll/:courseId",userAuth, async(req,res) => {
 try {
     const role = req.user.role;
  if(role !== "student"){
    return res.status(400).json({message : " You are not a student "})
  };
  const courseId = req.params.courseId;
  if(!courseId){
    return res.status(400).json({message : "enter the valid courseId"})
  };
  const validCourse = await CourseModel.findById(courseId);
  if(!validCourse){
        return res.status(400).json({message : "no course found"})
  };
  const enrollInCourse = new EnrollmentModel({userId : req.user.id, courseId : courseId})
  await enrollInCourse.save();
  res.json({message : "Enrolled successfully"})
 } catch (error) {
  if (error.code === 11000) { // MongoDB duplicate key error
      return res.status(409).json({ message: "You have already enrolled in this course." });
    }
    res.status(400).json({message : error.message})
 }
})

app.get("/my-courses", userAuth,async(req,res) => {
    try {
        const allCourse = await EnrollmentModel.find({userId : req.user.id}).populate("courseId").select({ __v: 0, createdAt: 0, updatedAt: 0 })
;
        res.send(allCourse)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



connectDB().then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
        console.log("PORT 3000");
    })
}).catch(() => {
    console.log('EROOR in connecting to DB');
})