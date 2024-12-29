const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.models");

const isUserLoggedIn = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.jWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        

        if (!user) {
            return res.status(401).json({ msg: "Not an student" });
        }

        req.user = user; // Attach admin info to the request
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = isUserLoggedIn;
