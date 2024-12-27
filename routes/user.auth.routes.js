const LoginUser = require("../controllers/student/Login.controller");
const express = require("express")
const router = express.Router();
const cors = require("cors")

router.post("/Login",LoginUser);

module.exports = router;