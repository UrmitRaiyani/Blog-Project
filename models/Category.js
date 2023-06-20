const mongoose = require('mongoose');

const gallery = mongoose.Schema({

    category:{
        type:String,
        required:true,
    },

});

const gallerydata = mongoose.model('gallerydata', gallery);

module.exports = gallerydata;