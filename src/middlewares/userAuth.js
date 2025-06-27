const jwt = require("jsonwebtoken")
require("dotenv").config()

const userAuth = (req,res,next) => {
  try {
    // get the token 
  const token  = req.cookies.userToken;
  
    if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // verify the token
  const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
  req.user = verifyToken;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token." });
    } else {
      return res.status(400).json({ error: "Token verification failed." });
    }
  }
}

module.exports = {userAuth};