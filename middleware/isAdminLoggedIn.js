const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin.model.js");

const isAdminLoggedIn = async (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }

    try {
        // Verify token and get admin info from database
        const decoded = jwt.verify(token, process.env.jWT_SECRET);
        const admin = await AdminModel.findById(decoded._id);
       

        if (!admin) {
            return res.status(401).json({ msg: "Not an admin" });
        }

        req.user = admin; // Attach admin info to the request
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = isAdminLoggedIn;
