const express = require('express');
const routes = express.Router();
const passport = require('passport');
const Admin = require('../../models/adminmodel');
const sub = require('../../models/subcate')

//blog

const blog = require('../../models/blogs');

//blog

const admin = require('../../controller/amincontroller/admin');

routes.get('/', admin.loginpage);

routes.get('/dashbord', passport.checkauthenticat, admin.showpannel);

routes.get('/add-record', passport.checkauthenticat, admin.add_record);

routes.get('/view-record', passport.checkauthenticat, admin.view_record);

routes.get('/account', passport.checkauthenticat, admin.account);

routes.post('/insertdata', passport.checkauthenticat, Admin.uploadedAvatar, admin.insertdata);

routes.post('/logincheck', passport.authenticate('local', { failureRedirect: '/' }), admin.logincheck);

routes.use('/addslider', require('./slider'))

routes.get('/deactive/:id', admin.deActive);

routes.get('/Active/:id', admin.Active);

routes.post('/checkMail', admin.checkMail);

routes.get('/otp', admin.otp);

routes.post('/checkotp', admin.checkotp);

routes.get('/resetPassword' , admin.resetPassword);

routes.post('/changepassword', admin.changepssword);

routes.use('/User', require('./../User-route/user_route'));

routes.get('/forgotpass',async (req,res)=>{
    res.render('forgotpass');
})

//blogs

routes.get('/Add-blog',async (req,res)=>{
    res.render('Add-blog');
});

routes.post('/insertBlogRecord',passport.checkauthenticat,blog.uploadedAvatar,admin.insertBlogrecord);

routes.get('/view_comments', admin.viewComments);

//blogs

///////////  GALERRY   /////////////////


routes.get('/Add_Category', (req,res)=>{
    return res.render('Add_Category')   
});

routes.get('/addsub',admin.addsub)

routes.post('/insertcategory', admin.insertcategory);
routes.post('/insertsubcategory',sub.uploadedAvtar ,admin.insertsubcategory);


///////////  GALERRY   /////////////////

routes.get('/logout', async (req, res) => {

    req.logOut(function (err) {
        if (err) {
            console.log(err);
        }
    })
    return res.redirect('/');

})
module.exports = routes;
