const validator= require("validator")
const validation = (req) => {
  const {name,email,password} = req.body;
  if(!name || !email || !password){
    throw new Error("Enter details First");
  }
  else if(!validator.isEmail(email)){
    throw new Error("Enter a valid Email");
  }
  else if (!validator.isStrongPassword(password)){
    throw new Error("Enter a strong password");
  }
}

module.exports = { validation };