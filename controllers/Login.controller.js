const UserModel = require("../models/User.models.js");
const comparePassword = require("../utils/Password.Compare.js")
const generateToken = require("../utils/Token.generation.js")
const setCookie = require("../utils/cookie.token.setter.js")

const LoginUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter username and password" });
  } else {
    // Check if user exists in the database
    const user = await UserModel.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    } else {
      // Check if password matches
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(400).json("USer is not found and user has false passwords");
      }
      else{
        // If password matches, generate JWT token
        const token =  generateToken(user._id);
        setCookie(res,token)
        req.session.user = user
        console.log("cookie is in controoler file ")
        // res.status(200).json({ token });
        res.render('stuDashboard',{user})
      //  return res.redirect('/stuDashboard')
        // res.status(200).json("User Logged-In Succefully")
      }
    }
  }
};

module.exports = LoginUser;
