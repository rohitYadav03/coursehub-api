const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const {UserModel} = require("../models/user.js");
const {validation} = require("../utils/validation.js");
const { userAuth } = require("../middlewares/userAuth.js");
require('dotenv').config()


const authRouter = express.Router();

authRouter.post("/register", async(req,res) => {
// register api for user and instructor -> first get all the relvent details -> hash the password -> save to db

   try {
    validation(req);
   const {name,email,password,role} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
     
    const userDetails = new UserModel({
        name,
        email,
        password : hashPassword,
        role
    })
    await userDetails.save();
    res.json({message : "Singup done"})

   } catch (error) {
  if(error.code === 11000){
  return  res.status(400).json({message : "Email alredy register"})
  }
    
    res.status(400).json({message : error.message})
   }
})

authRouter.post("/login", async(req,res) => {
try {
    const {email, password} = req.body;
    if(!email || !password){
        throw new Error("Enter details first");  
    }
     const userDetails = await UserModel.findOne({email : email});

     if(!userDetails){
        throw new Error("Email id not register");
     }
     
     const isPasswordCorrect  = await bcrypt.compare(password,userDetails.password);
     if (!isPasswordCorrect) {
  return res.status(401).json({ message: "Invalid credentials" });
}else {
 // now there user has entered the correct id and password , so here we need few important things
 // 1. genreate the token 2. set the token in cookies 3. set the response 
const token = jwt.sign({id : userDetails._id, role : userDetails.role},process.env.JWT_SECRET,{expiresIn : '30d'} );
   
// now snding this token cookie 
  res.cookie("userToken",token, {
    httpOnly : true, // 	Cookie is not accessible to JavaScript (document.cookie). Blocks most XSS steals.
    sameSite : "lax", //  save from csrf => Requests will only send cookies if they come from the same site not from the other website
    secure : process.env.NODE_ENV === "production", // this is for hhtps only in devlopment false in production true
    maxAge : 30 * 24 * 60 * 60 * 1000
  });
  res.json({message : "login succesfully"})
}

} catch (error) {
    res.status(400).json({message : error.message})
}
});

authRouter.post("/logout", userAuth, (req,res) => {
  res.clearCookie("userToken");
  res.status(200).json({message : "logout"})
})

module.exports = { authRouter };


