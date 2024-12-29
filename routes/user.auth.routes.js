const LoginUser = require("../controllers/student/Login.controller");
const express = require("express")
const cors = require("cors")
const router = express.Router();
const RegisterUser = require("../controllers/Register.controller.js")
const {registerAdmin} = require("../controllers/student/Register.controller.js")
const LogoutUser = require("../controllers/Logout.controller.js")
const Admin = require("../models/admin.model");
const upload = require("../middleware/multer.js");
const UserModel = require("../models/User.models.js");
const comparePassword = require("../utils/Password.Compare.js");
const generateToken = require("../utils/Token.generation.js");
const AdminModel = require("../models/admin.model.js")
const bcrypt = require("bcrypt");
const inquiryController = require("../controllers/Enquiry.controller.js");

router.post("/Login",LoginUser);
router.post("/registerAdmin", registerAdmin);
// Route to handle user inquiry submission


// Route to fetch all inquiries (for admin)
router.get("/admin/inquiries", inquiryController.getAllInquiries);


module.exports = router;