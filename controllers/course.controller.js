const Course = require("../models/course.model");

const courseUpload = async (req, res) => {
    try {
        const { title, description} = req.body;
        const images = req.file ? req.file.buffer.toString("base64") : null
        // console.log(title, images);
        if (!title || !images) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        const newCourse = new Course({
            title,
            description,
            images,
        });
        await newCourse.save();
        res.status(200).json("course uploaded successfully");
    } catch (err) {
        console.error("Error uploading course:", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = courseUpload