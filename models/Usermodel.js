const mongoose = require('mongoose');
const AVATAR_PATH = '/uploads';
const path = require('path');
const multer = require('multer');

const User = mongoose.Schema({
    sliderTitle: {
        type: String,
        required: true
    },
    secondsliderTitle: {
        type: String,
        required: true
    },
    avatarSlider: {
        type: String,
        required: true
    },
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    },
})

User.statics.uploadedAvatar = multer({ storage: storage }).single('avatarSlider');
User.statics.avatarPath = AVATAR_PATH;

const sliderdata = mongoose.model('User', User)
module.exports = sliderdata