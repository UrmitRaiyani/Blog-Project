const mongoose = require('mongoose')

const AVTAR_PATH = '/uploads'

const multer = require('multer')

const path = require('path')

const subSchema = mongoose.Schema({
    subName : {
        type : String,
        required : true
    },
    categoryId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'gallerydata',
    },
    subImage : {
        type : String,
        required : true
    },
})

const imageStorage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,path.join(__dirname,'..',AVTAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

subSchema.statics.uploadedAvtar = multer({storage : imageStorage}).single('subImage')
subSchema.statics.avtarPath = AVTAR_PATH

const sub = mongoose.model('sub',subSchema)

module.exports = sub;