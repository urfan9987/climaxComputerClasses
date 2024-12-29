// const adminModel = require("../models/admin.model.js");

// const find = async(req,res,next) => {
//     const token = req.cookies.adminToken;
//     if (!token) {
//         return res.status(401).json({ msg: "Unauthorized access" });
//     }
//     try{
//          const decoded = jwt.verify(token, process.env.JWT_SECRET);
//          console.log(decoded)
//     const admin = await adminModel.find();
//     // res.render("stuList",{admin}); // Adjust for EJS or HTML
//     console.log(admin)
// }
// catch (err) {
//     return res.status(401).json({ msg: "Invalid token" });
// }
//     next();
// }

// module.exports = find;