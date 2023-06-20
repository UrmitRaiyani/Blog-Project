const pannel = require('../../models/adminmodel');
const nodemailer = require('nodemailer');
const Blog = require('../../models/blogs')
const Comment = require('../../models/Comment')
const Category = require('../../models/Category')
const sub = require('../../models/subcate');
const bcrypt = require('bcrypt');

module.exports.loginpage = async (req, res) => {

    if (req.isAuthenticated()) {
        return res.redirect('/dashbord');
    }
    else {
        return res.render('login', { layout: 'login' });
    }

}

module.exports.account = (req, res) => {

    //    if(req.isAuthenticated())
    //    {
    return res.render('account');
    //    }
    //    let Admindata = req.cookies.admindata;
    //    return res.render('account',{
    //         record : Admindata
    //    })
}

module.exports.showpannel = async (req, res) => {
    //    if(req.cookies.admindata != 'undefined')
    //    {
    return res.render('dashbord');
    //    }
    //    else
    //    {
    //         return res.redirect('/')
    //    }


}

module.exports.add_record = async (req, res) => {

    // if(req.cookies.admindata != 'undefined')
    // {
    return res.render('add-record')
    // }
    // else
    // {
    //         return res.redirect('/')
    // }
}

module.exports.view_record = async (req, res) => {

    let search = ''
    if (req.query.search) {
        search = req.query.search
    }

    let page = 1

    if (req.query.page) {
        page = req.query.page
    }

    const limit = 2;

    let data = await pannel.find({
        $or: [
            { name: { $regex: search, $options: 'i' } },
        ]
    })

        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    let count = await pannel.find({
        $or: [
            { 'name': { $regex: search, $options: 'i' } },

        ]
    }).countDocuments();

    if (data) {
        return res.render('view-record', {
            record: data,
            totalPage: Math.ceil(count / limit),
            searchData: search,
            currentPage: page
        });
    }
    else {
        return res.redirect('view-record');
    }


}

module.exports.insertdata = async (req, res) => {
    // console.log(req.body);
    let hashpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashpassword;
    req.body.name = req.body.fname + ' ' + req.body.lname;
    let imgPath = '';
    if (req.file) {
        imgPath = pannel.avatarPath + '/' + req.file.filename;
        req.body.avatar = imgPath;
    }
    req.body.isActive = true
    pannel.create(req.body).then(() => {
        return res.redirect('/add-record');
    }).catch(err => {
        console.log(err);
    })
}

module.exports.logincheck = async (req, res) => {
    return res.redirect('/dashbord');
    //res.redirect('/')
    // var admindata = await pannel.findOne({email:req.body.email});
    // if(admindata && admindata.password == req.body.password)
    // {
    //     res.cookie('admindata',admindata)
    //     
    // }
    // else
    // {

    // }
}

module.exports.deActive = async (req, res) => {

    let data = await pannel.findByIdAndUpdate(req.params.id, { isActive: false });
    if (data) {
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}


module.exports.Active = async (req, res) => {
    let data = await pannel.findByIdAndUpdate(req.params.id, { isActive: true });
    if (data) {
        return res.redirect('back');
    }
    else {
        return res, redirect('back');
    }
}

module.exports.checkMail = async (req, res) => {
    let mail = await pannel.findOne({ email: req.body.email });
    if (mail) {
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "914d16b4b793bf",
                pass: "98eae3ad2dcc73"
            }
        });
        var otp = Math.ceil(Math.random() * 10000);
        res.cookie('otp', otp);
        res.cookie('mail', req.body.email);

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'raiyaniurmit@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "otp for verification", // Subject line
            text: req.body.name, // plain text body
            html: `<b>otp: ${otp}</b>`, // html body
        });
        return res.redirect('/otp');
    }
    else {
        return res.redirect('back')
    }
}

module.exports.otp = async (req, res) => {
    return res.render('otp');
}

module.exports.checkotp = async (req, res) => {
    if (req.body.otp == req.cookies.otp) {
        return res.redirect('/resetpassword');
    }
    else {
        return res.redirect('back');
    }
}

module.exports.resetPassword = (req, res) => {
    return res.render('resetpassword');
}

module.exports.changepssword = async (req, res) => {

    if (req.body.npassword == req.body.cpassword) {
        let email = await pannel.findOne({ email: req.cookies.mail });
        // console.log(email);
        if (email) {
            let data = await pannel.findById(email.id);
            if (data) {
                let hash = await bcrypt.hash(req.body.npassword, 10)
                let cp = await pannel.findByIdAndUpdate(data.id, { password: hash });

                if (cp) {
                    return res.redirect('/');

                }
                else {
                    return res.redirect('back');
                }
            }
            else {
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('back');
        }
    }
    else {
        return res.redirect('back');
    }
}

///////////////////////  BLOGS ////////////////////

module.exports.insertBlogrecord = async (req, res) => {
    // console.log(req.file);
    // console.log(req.body);
    // console.log(req.user.name)
    var todayDate = new Date().toISOString().slice(0, 10);
    // console.log(todayDate);

    var imagePath = '';
    if (req.file) {
        imagePath = Blog.avatarPath + "/" + req.file.filename;
    }
    req.body.avatar = imagePath;
    req.body.date = todayDate;
    req.body.username = req.user.name;
    req.body.isActive = true

    let blogData = await Blog.create(req.body);
    if (blogData) {

        return res.redirect('/Add-blog');
    }
    else {

        return res.redirect('/Add-blog');
    }
}

module.exports.viewComments = async (req,res) =>{
    // let commentData = await Comment.find({});
    let commentData = await Comment.find({}).populate('blogId').exec();
    console.log(commentData);
    return res.render('view_comment', {
        'commentData' : commentData
    })
}


///////////////////////  BLOGS  ////////////////////


/////////// //// GALERRY  ////// /////////////////


module.exports.insertcategory = async (req,res) => {
    // console.log(req.body);

    const data = await Category.create(req.body);

    if(data)
    {
        return res.redirect('back')
    }
    else{
        console.log('data is not insert');
        return res.redirect('back')
    }
}


module.exports.addsub = async (req,res)=>{

    const cate = await Category.find({})

    return res.render('addSub',{
        'cateData' : cate
    });

}

module.exports.insertsubcategory = async (req,res) =>{

    var imagePath = ''

    if (req.file) {
        imagePath = sub.avtarPath + "/" + req.file.filename
        req.body.subImage = imagePath
    }

    
    let subData = await sub.create(req.body)
    
    if(subData)
    {
        return res.redirect('back')
    }
    else{
        console.log('data is not insert');
        return res.redirect('back')
    }

}
/////////////////  GALERRY   ///////////////////