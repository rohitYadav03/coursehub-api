const express = require("express");
const {userAuth} = require("../middlewares/userAuth.js");
const { CourseModel } = require("../models/course.js")

const courseRouter = express.Router();

courseRouter.post("/", userAuth,async(req,res) => {
   try {
    const userRole = req.user.role;
    if(userRole === "instructor"){
  const {title,description,price,thumbnail,category} = req.body;

  if (!title || !description || !price || !thumbnail) {
    return res.status(400).json({ message: "All fields are required" });
}
const courseDetails = new CourseModel({
    title,
    description,
    price,
    thumbnail,
    category,
    instructor : req.user.id
});

await courseDetails.save();
res.status(201).json({ message: "Course created successfully", course: courseDetails });

    }else {
        throw new Error("You are not instructor , you cannot create course"); 
    }
   } catch (error) {
    res.status(400).json({message : error.message})
   }
});

courseRouter.get("/", async(req,res) => {
    try {
        const allCourse = await CourseModel.find({}).populate("instructor", "name email");
    res.status(200).json(allCourse)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

courseRouter.get("/:id", async(req,res) => {
    try {
        const courseId = req.params.id;
        
        if(!courseId){
            throw new Error("Enter a valid course Id");  
        };
        const courseDetails = await CourseModel.findById(courseId).populate("instructor","name email");
        if(!courseDetails){
            throw new Error("No course found");
        }
        res.status(200).json({courseDetails});
    } catch (error) {
        res.status(400).json({message : error.message});
    }
})

courseRouter.delete("/:id", userAuth, async (req, res) => {
  try {
    const  courseId  = req.params.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can delete courses." });
    }

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorised to delete this course." });
    }

    const deleted = await CourseModel.findByIdAndDelete(courseId);
    if (!deleted) {
      return res
        .status(500)
        .json({ message: "Course could not be deleted. Please try again." });
    }

    return res.json({
      message: "Course deleted successfully.",
      course: deleted,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
});


module.exports = {courseRouter}