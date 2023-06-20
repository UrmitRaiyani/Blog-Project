const slider = require('../../models/Usermodel');
const blogs =require('../../models/blogs');
const Comment = require('../../models/Comment');
const category = require('../../models/Category');
const sub = require('../../models/subcate')

module.exports.loginpage = async (req,res) => {

let data = await slider.find({})
let blog = await blogs.find({})


if(data){
    res.render('User/userindex', {
        sliderdata: data,
        blogdata: blog, 
    });
 }     
}

module.exports.SingalBlog = async (req,res) => {

   let singleRecord = await blogs.findById(req.params.id);
   let countComment = await Comment.find({blogId:req.params.id,isActive: true}).countDocuments();
   let commentData = await Comment.find({blogId:req.params.id,isActive: true});

   let lastRecord = await blogs.find({}).sort({_id : -1}).limit(3);
//    console.log(lastRecord);

   return res.render('User/Singal_Blog' ,{'singleR' : singleRecord, 'blogId': req.params.id , 'commentData':commentData , countComment : countComment, lastRecord : lastRecord});
}


module.exports.setComments = async (req,res)=>{
//    console.log(req.body);
//    console.log(req.file);
   var imagePath = '';
   if(req.file){
       imagePath = Comment.avatarPath+"/"+req.file.filename;
   }

   req.body.image = imagePath;
   req.body.isActive = true;
   let commentData = await Comment.create(req.body);
   if(commentData){
       return res.redirect('back');
   }
   else{
       console.log("error");
       return res.redirect('back');
   }

}

module.exports.gallerypage = async (req,res)=>{

    let page = ''

    if(req.query.page)
    {
        page = req.query.page
    }
    // console.log(page);
    let allData = await category.find({})

    let subD = await sub.find({}).populate('categoryId').exec()
    // console.log(subD)

    return res.render('User/gallery',{
    allData : allData,
        subD : subD
    });
}
