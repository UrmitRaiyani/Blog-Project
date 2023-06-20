const mongoose = require('mongoose');
const AVATAR_PATH = '/uploads';
const path = require('path');
const multer = require('multer');
const { search } = require('../routes/User-route/user_route');

const record = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hobby: {
        type: Array,
        required: true
    },
    country: {
        type: String,
        required: true
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

record.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
record.statics.avatarPath = AVATAR_PATH;

const panneldata = mongoose.model('record', record)
module.exports = panneldata