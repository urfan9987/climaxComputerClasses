const express = require("express")
const router = express.Router();
const gallery = require("../controllers/Gallery.controller")
const uplaod = require("../middleware/multer");
// const courseModel = require("../models/course.model");
const course = require("../controllers/course.controller");

// Import routes

router.post("/galleryUpload",uplaod.single('images'),gallery );
// router.post("/courseUpload",uplaod.single('images'), courseModel );
router.post("/courseUpload",uplaod.single('images'), course );

module.exports = router;