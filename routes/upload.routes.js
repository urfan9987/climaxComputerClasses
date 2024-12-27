const express = require("express")
const router = express.Router();
const gallery = require("../controllers/Gallery.controller")
const uplaod = require("../middleware/multer");
const courseModel = require("../models/course.model");

// Import routes

router.post("/galleryUpload",uplaod.single('images'),gallery );
router.post("/courseUpload",uplaod.single('images'), courseModel );

module.exports = router;