const Admin = require("../../models/admin.model");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ msg: "Admin already exists" });
        }

        // Create new admin
        const admin = new Admin({ username, email, password });
        await admin.save();

        // Generate JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({ msg: "Admin registered successfully", token });
    } catch (err) {
        console.error("Error registering admin:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { registerAdmin };
