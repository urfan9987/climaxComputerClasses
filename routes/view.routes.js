var express = require('express');
var router = express.Router();
const session = require('express-session');
const isLoggedIn = require('../middleware/isAdminLoggedIn');
const isAdminLoggedIn = require('../middleware/isAdminLoggedIn');
const isUserLoggedIn = require('../middleware/isUserLoggedIn');
const galleryModel = require('../models/gallery.model');
const userModel = require('../models/User.models');
const find = require('../middleware/admindatafetch');
// const course = require('../models/course.model');
const courseModel = require('../models/course.model');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const course = await courseModel.find();
  res.render('index', { title: 'HOMe', course });
});
router.get('/courses', async function(req, res, next) {
  const course = await courseModel.find();
  res.render('courses', { title: 'courses', course });
});

router.get('/contact-us', function(req, res, next) {
  res.render('contact-us', { title: 'contacts' });
});

router.get('/courses', function(req, res, next) {
  res.render('courses', { title: 'courses' });
});

router.get('/student-login', function(req, res, next) {
  res.render('stulogin', { title: 'login' });
});

router.get('/photo-gallery',async function(req, res, next) {
  const data = await galleryModel.find()
  console.log(data);  // Log the data to check if the `images` field is populated properly.

  res.render('gallery', { data });
});

router.get('/inquiry', function(req, res, next) {
  res.render('inquiry', { title: 'inquery' });
});

router.get('/admin-login', function(req, res, next) {
  res.render('admin-login', { title: 'login' });
});

router.get('/courseUplaod', isAdminLoggedIn ,function(req, res, next) {
  res.render('CourseUplaod', { title: 'Course' });
});

router.get('/galleryUpload', isAdminLoggedIn, function(req, res, next) {
  res.render('galleryUpload', { title: 'gallery' });
});

router.get('/stuRegister', isAdminLoggedIn ,function(req, res, next) {
  res.render('stuRegister', { title: 'Course' });
});

router.get('/stuDashboard', isUserLoggedIn ,function(req, res, next) {
 
      res.render('stuDashboard');  // Pass the entire user object to EJS or render
   
});

router.get("/admin-dashboard", isAdminLoggedIn ,(req, res) => {
  res.render("adminDashboard", { user: req.user }); // Adjust for EJS or HTML
});

router.get("/stuList",isAdminLoggedIn ,async (req, res) => {
  const student = await userModel.find();
  res.render("stuList",{student}); // Adjust for EJS or HTML
});

router.get("/inquery" ,async (req, res) => {

  res.render("inquiry"); // Adjust for EJS or HTML
});



module.exports = router;
