const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    images:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Gallery', GallerySchema)