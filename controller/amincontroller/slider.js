const slider = require('../../models/Usermodel')

module.exports.sliderpage = (req,res) => {
    return res.render('addslider')
 }
 
 module.exports.sliderinsert = async (req,res) =>{
   //   console.log(req.file)
   //   console.log(req.body)

    var imgPath = '';
    if (req.file) {
        imgPath = slider.avatarPath + '/' + req.file.filename;
        req.body.avatarSlider = imgPath;
    }

     let sliderdata = await slider.create(req.body);

     if(sliderdata)
     {
        return res.redirect('/');
     }
     else
     {
        return res.redirect('/dashbord')
     }
 }