const express = require("express")
const router = express.Router();
const path = require('path');
const { createCanvas, loadImage } = require('canvas');


// Import models

const UserModel = require("../models/User.models");
const UserModels = require("../models/User.models");


router.post("/DistCertificate/:id", async (req, res) => {
    // Get user details from request parameters
    const id = req.params.id;
    
    // Find user by id
    const updatedUser = await UserModel.findByIdAndUpdate(id, { certificate: "Issued" });
    
    if (updatedUser) {
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
    
 
})

router.post('/api/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const student = await UserModels.findById({_id: studentId});
    const  {name, fathersname, grade, course} = student;
  
    if (!student || student.certificate !== 'Issued') {
      return res.status(404).send('Student not found or course not completed');
    }
  
    const template = await loadImage('./templates/certificate-template.jpg');
    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext('2d');
  
    ctx.drawImage(template, 0, 0);
    ctx.font = '105px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(name, 650, 750);
    ctx.font = '35px Arial bold';
    ctx.fillText(fathersname, 680, 848);
    ctx.font = '35px Arial';
    ctx.fillText(grade, 1050, 900);
    ctx.font = '35px Arial';
    ctx.fillText(course, 450, 900);
    // ctx.fillText(`Completed on: ${student.completionDate.toDateString()}`, 300, 400);
  
    res.set('Content-Type', 'image/jpeg');
    res.send(canvas.toBuffer('image/jpeg'));
  });

 router.post('/api/grades/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    console.log(req.body.grade);
    const {grades} = await UserModels.findByIdAndUpdate(studentId, { grade: req.body.grade });
    // console.log(updateGrades);
      res.status(200).json({ message: 'Grades updated successfully', grades });
  

 })

module.exports = router;

