const express = require("express");
const router = express.Router();
const { createCanvas, loadImage, Image } = require("canvas");

// Import models
const UserModel = require("../models/User.models");
const UserModels = require("../models/User.models");

router.post("/DistCertificate/:id", async (req, res) => {
  // Get user details from request parameters
  const id = req.params.id;

  // Find user by id and update certificate status
  const updatedUser = await UserModel.findByIdAndUpdate(id, { certificate: "Issued" });

  if (updatedUser) {
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.post("/api/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  // Find the student by ID
  const student = await UserModels.findById({ _id: studentId });
  if (!student || student.certificate !== "Issued") {
    return res.status(404).send("Student not found or course not completed");
  }

  const { username, name, fathersname, grade, date, course, dp } = student;

  // Load certificate template
  const template = await loadImage("./templates/222222-1.png");
  const canvas = createCanvas(template.width, template.height);
  const ctx = canvas.getContext("2d");

  // Draw the certificate template
  ctx.drawImage(template, 0, 0);

  // Add text fields (name, father's name, grade, and course)
  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(name, 680, 1090);
  ctx.font = "50px Arial bold";
  ctx.fillText(fathersname, 450, 1185);
  ctx.font = "50px Arial";
  ctx.fillText(grade, 520, 1380);
  ctx.fillText(course, 800, 1280);
  ctx.fillText(username, 220, 1020);
  ctx.fillText(date, 430, 1475);

  // Decode and draw the Base64 profile image (dp)
  if (dp) {
    try {
      const img = new Image();
      img.src = `data:image/png;base64,${dp}`; // Assuming dp is stored as Base64 without prefix
      const dpSize = 300; // Set profile image size (200x200 pixels)
      ctx.drawImage(img, 1070, 660, 270, 360); // Adjust position and size
    } catch (error) {
      console.error("Failed to decode and draw Base64 image:", error.message);
    }
  }

  // Send the certificate as a JPEG image
  res.set("Content-Type", "image/jpeg");
  res.send(canvas.toBuffer("image/jpeg"));
});

router.post("/api/grades/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  const { grade, date } = req.body;

  const updatedStudent = await UserModels.findByIdAndUpdate(studentId, { grade: grade, date: date });
  if (updatedStudent) {
    res.status(200).json({ message: "Grades updated successfully", updatedStudent });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

module.exports = router;
