const express = require("express")
const router = express.Router();
const cors = require("cors")
const RegisterUser = require("../controllers/Register.controller.js")
const LoginUser = require("../controllers/Login.controller.js")
const LogoutUser = require("../controllers/Logout.controller.js")
const Admin = require("../models/admin.model");
const upload = require("../middleware/multer.js");
const UserModel = require("../models/User.models.js");
const comparePassword = require("../utils/Password.Compare.js");
const generateToken = require("../utils/Token.generation.js");

// Middleware to handle CORS requests

router.use(cors());
router.post("/Register", upload.single("dp") ,RegisterUser);
router.post("/Login",LoginUser);
router.post("/Logout",LogoutUser);
router.post("/adminC",async(req,res)=>{
    try {
        
        const newAdmin = new Admin({
          name: "rishabh",
          email: "admin@examplee.com",
          password: "rishabh",  // Don't forget to hash the password before saving
        });
    
        await newAdmin.save();
        console.log("Admin created successfully:", newAdmin);
      } catch (err) {
        console.error("Error creating admin:", err);
      }

});
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  
})


module.exports = router;    