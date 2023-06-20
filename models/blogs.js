const mongoose = require('mongoose');
const AVATAR_PATH = '/uploads';
const path = require('path');
const multer = require('multer');
const { search } = require('../routes/User-route/user_route');

const BlogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    avatar:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        require:true
    }
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    },
})

BlogSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
BlogSchema.statics.avatarPath = AVATAR_PATH;

const Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog