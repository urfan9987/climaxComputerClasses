const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI;

const db = mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("Database Connection Established")
}).catch((e)=>{
    console.log(e.message)
})



