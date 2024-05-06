const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const RegisterModel = require('../models/RegisterModel');

const bcrypt = require('bcrypt');

passport.use(new passportLocal({
    usernameField : "email",
},async(email,password,done)=>{
   try{ 
        let userLogin = await RegisterModel.findOne({email : email});

        
            console.log(await bcrypt.compare(password,userLogin.password));
        

        if(!userLogin || !(await bcrypt.compare(password,userLogin.password))){
            console.log("Email and Password not valid");
            return done(null,false);
        }
       return done(null,userLogin);
   }catch(err){
        return done(err,false);
   }
}))

passport.serializeUser((userLogin,done)=>{
    return done(null,userLogin.id);
});


passport.deserializeUser(async(id,done)=>{
    try{
        let userLogin = await RegisterModel.findById(id);
        return done(null,userLogin);
    }catch(err){
        return done(err,false);
    }
})

passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.userlogin = req.user;
    }
    return next();
}

module.exports = passport;