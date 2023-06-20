const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const admin = require('../models/adminmodel');
const bcrypt = require('bcrypt');

passport.use(new passportlocal({
    usernameField : 'email'
},
    async function(email,password,done){
        let admindata = await admin.findOne({email:email});
        if(admindata){
            let passwordcheck = await bcrypt.compare(password,admindata.password);  
            if(!admindata || !passwordcheck)
            {
                return done(null,false);
            }
            else
            {
                return done(null,admindata);
            }
        }
        return done(null,admindata);
    }
))

passport.serializeUser(function(admindata,done){
    return done(null,admindata.id);
});

passport.deserializeUser(async function(id,done){
    let Admin = await admin.findById(id);
    if(Admin)
    {
        return done(null,Admin);
    }
    else
    {
        return done(null, false);
    }
})

passport.checkauthenticat = function(req,res,next){
    if(req.isAuthenticated())
    {
        next();
    }
    else{
        return res.redirect('/');
    }
  
}

passport.datashow = (req,res,next)=>{
    
    if(req.isAuthenticated())
    {
        res.locals.Admin = req.user; 
    }
    next();
}
module.exports = passport;