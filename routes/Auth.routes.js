const express = require("express")
const router = express.Router();
const cors = require("cors")
const RegisterUser = require("../controllers/Register.controller.js")
const {registerAdmin} = require("../controllers/student/Register.controller.js")
const LoginUser = require("../controllers/Login.controller.js")
const LogoutUser = require("../controllers/Logout.controller.js")
const Admin = require("../models/admin.model");
const upload = require("../middleware/multer.js");
const UserModel = require("../models/User.models.js");
const comparePassword = require("../utils/Password.Compare.js");
const generateToken = require("../utils/Token.generation.js");
const AdminModel = require("../models/admin.model.js")
const bcrypt = require("bcrypt");
const inquiryController = require("../controllers/Enquiry.controller.js");

// Middleware to handle CORS requests

router.use(cors());
router.post("/Register", upload.single("dp") ,RegisterUser);
router.post("/Login",LoginUser);
router.post("/Logout",LogoutUser);
router.post("/registerAdmin", registerAdmin);
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  
})
router.post("/api/inquiry", inquiryController.createInquiry);


module.exports = router;    