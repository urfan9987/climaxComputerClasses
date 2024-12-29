// controllers/inquiry.controller.js
const Inquiry = require("../models/enquiry.model");

const createInquiry = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newInquiry = new Inquiry({
      name,
      email,
      message,
      phone,
    });

    await newInquiry.save();

    res.status(200).json({ msg: "Inquiry submitted successfully" });
  } catch (err) {
    console.error("Error submitting inquiry:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.render("AdminInquery", { inquiries });
  } catch (err) {
    console.error("Error fetching inquiries:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { createInquiry, getAllInquiries };
