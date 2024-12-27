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
    const  {name} = student;
  
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
    // ctx.fillText(student.name, 300, 300);
    // ctx.fillText(student.course, 300, 350);
    // ctx.fillText(`Completed on: ${student.completionDate.toDateString()}`, 300, 400);
  
    res.set('Content-Type', 'image/jpeg');
    res.send(canvas.toBuffer('image/jpeg'));
  });

module.exports = router;

