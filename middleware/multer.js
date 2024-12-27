const multer = require("multer");

// Configure multer storage
const storage = multer.memoryStorage(); // Store file in memory as a buffer
const upload = multer({ storage });

module.exports = upload;
