const Admin = require("../../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminsetCookie = require("../../utils/adminCookie.setter");

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Check if admin exists
        const admin = await Admin.findOne({ username });
        console.log(admin)
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        AdminsetCookie(res, token);

        // res.status(200).json({
        //     msg: "Login successful",
        //     token,
        //     admin: {
        //         id: admin._id,
        //         username: admin.username,
        //         email: admin.email,
        //     },
        // });
        
        res.redirect("/admin-dashboard");
    } catch (err) {
        console.error("Error logging in admin:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports =  loginAdmin ;
