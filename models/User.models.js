const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
   
  },
  name:{
    type:String,
    required: [true, "Name is required"],
  },
  fathersname:{
    type:String,
    required: [true, "Father's Name is required"],
  },
  grade:{
    type: String,
    default: "Not assigned yet ",
  },
  date:{
    type: String,
  },

  certificate:{
    type: String,
    default: "Not issued yet ",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    
  },
  course: {
    type: String,
    // required: [true, "Course is required"],
    enum: [
      "CCC", 
      "O Level", 
      "DCA", 
      "ADCA", 
      "MICROSOFT", 
      "CPCA", 
      "EXCEL", 
      "DIT", 
      "JAVA", 
      "DTP", 
      "CCA", 
      "Tally Accounting", 
      "HINDI/ENGLISH TYPING"
      ]
  },
  dp: {
    type: String, // Store the file path or cloud storage URL
    // default: "default-profile.jpg", // Optional default profile picture
  },
}, { timestamps: true });



module.exports = mongoose.model("UserAuth", UserSchema )