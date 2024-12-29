const Gallery = require("../models/gallery.model.js");

const galleryUpload = async (req, res) => {
    try {
        const { title} = req.body;
        const images = req.file ? req.file.buffer.toString("base64") : null
        // console.log(title, images);
        if (!title || !images) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        const newGallery = new Gallery({
            title,
            images,
        });
        await newGallery.save();
        res.status(200).json("Gallery uploaded successfully");
    } catch (err) {
        console.error("Error uploading gallery:", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = galleryUpload;