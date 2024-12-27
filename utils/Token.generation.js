const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;

const generateToken = (userId)=>{
    const token = jwt.sign({ userId }, jwt_secret, { expiresIn: '1h' });
    console.log(token)
    return token; 

}
module.exports = generateToken;