const AdminModel = require("../../models/admin.model.js");
const comparePassword = require("../../utils/Password.Compare.js")
const generateToken = require("../../utils/Token.generation.js");
const AdminsetCookie = require("../../utils/adminCookie.setter.js");
const setCookie = require("../../utils/cookie.token.setter.js")

const LoginUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ msg: "Please enter username and password" });
  } else {
    // Check if user exists in the database
    const user = await AdminModel.findOne({ $or: [{ name }, { email }] });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    } else {
      // Check if password matches
      
      if (password == user.password) {
          // If password matches, generate JWT token
          const token =  generateToken(user._id);
          AdminsetCookie(res,token)
          console.log("cookie is in controoler file ")
          // res.status(200).json({ token });
         return res.redirect('/admin-dashboard')
          // res.status(200).json("User Logged-In Succefully")
       
      }
      else{
        res.status(400).json("USer is not found and user has false passwords");
      }
    }
  }
};

module.exports = LoginUser;
