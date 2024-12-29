const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

const isAdminLoggedIn = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.adminToken;

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized: No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id);

        if (!req.admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Error in isAdminLoggedIn middleware:", err);
        res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }
};

module.exports = isAdminLoggedIn;
