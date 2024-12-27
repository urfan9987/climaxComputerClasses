const bcrypt = require("bcrypt")


const comparePassword = (password, hashedPassword)=>{
       
    try {
        const isMatch = bcrypt.compare(
            password,
            hashedPassword
        )
        return isMatch;

    } catch (err) {
        console.error("Error comparing passwords:", err);
        throw new Error("Password comparison failed.");
    }
}

module.exports = comparePassword;