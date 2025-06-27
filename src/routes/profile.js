const express = require("express");
const { userAuth } = require("../middlewares/userAuth.js");
const {UserModel} = require("../models/user.js")

const profileRouter = express.Router();

profileRouter.get("/",userAuth, async(req,res) => {
    // we need to fetch all the details og the user and show it or send it 
    try {
        const userData = await UserModel.findOne({_id : req.user.id}).select({password : 0});
        res.send(userData);

    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

profileRouter.patch("/edit", userAuth, async(req,res,next) => {
    // in this api we will get all the user data that user will send and update we will not update emailId and password here
   try {
    
    const newName = req.body.name;
   
    if(!newName){
        return res.status(400).json({message : "Enter the details"})
    }

    const existingUser = await UserModel.findById(req.user.id);
 if (!existingUser) {
  return res.status(404).json({ message: "User not found" });
}
if (existingUser.name === newName) {
  return res.status(400).json({ message: "Name is already up to date" });
}
if (existingUser.name.trim().toLowerCase() === newName.trim().toLowerCase()) {
  return res.status(400).json({ message: "Name is already up to date" });
}

    const userData = await UserModel.findOneAndUpdate({_id : req.user.id},{name : newName},{runValidators : true, new: true });
    res.send(userData)
   } catch (error) {
    res.status(400).json({message : error.message})
   }
})

module.exports = {profileRouter}