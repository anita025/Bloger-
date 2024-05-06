const express = require('express');

const port = 9000;

const app = express();

const path = require('path');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');

const cookie = require('cookie-parser');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/uploads', express.static(path.join('uploads')))

const multer = require('multer');

const mystorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,imagePath);  
    },
    filename : (req,file,cb) => {
        cb(null,file.fieldname+"-"+Date.now()); 
    }
})

const imageUpload = multer({ storage : mystorage}).single('avatar');

app.use(session({
    name : "Hitesh",
    secret : "RNW3",
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000*60*60
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use(cookie());

app.use(express.static(path.join(__dirname,'/public/admin')));
app.use(express.static('public/user'))

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use('/',require('./routes/user/yomroutes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server is start on port :- "+port);
})