const express = require("express");
const UserModel = require("../models/User.models.js")
const bcrypt = require("bcrypt");
const axios = require("axios")

const RegisterUser = async (req,res)=>{
    console.log(req.body)
   const {name,username, email, password, course}= req.body;
//    const dp = res.file.buffer.toString("base64");
const dp = req.file ? req.file.buffer.toString("base64") : null;

   console.log(name,username, password, email, course)

   const user = await UserModel.findOne({email});
   
   if (user) {
        return res.json("Email already exists")
   }


   if (!username || !email || !password) {
    console.log("Missing fields:", { username, email, password });
        res.status(400).json("All Fields Are required")    
   }
   else{
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
        name,
        username,
        email,
        course,
        password: hashedPassword,
        dp,
    })
    
        // await axios.post("http://localhost:3002/send/WelcomeMail",{ email, username });
        console.log("email sent succefully")    
    res.json("User Registered Successfully")   
   }
}

module.exports = RegisterUser;