const Register = require('../models/RegisterModel');
const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads");
const nodemailer = require('nodemailer');

const cookie = require('cookie-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const dash = (req,res) => {
    return res.render('dash');
}

const register = (req,res) => {
    return res.render('register');
}

const login = (req,res) => {
    if(res.locals.userlogin){
        return res.redirect('/dash');
    }
    return res.render('login');
}

const registerData = async(req,res) => {

    try{
        const {name,email,password,cpassword} = req.body;

        if(password == cpassword){
            let user = await Register.create({
                name : name,
                email : email,
                password : await bcrypt.hash(password,saltRounds),
            })
            if(user){
                console.log("User successfully register");
                return res.redirect('back');
            }else{
                console.log("User not successfully register");
                return res.redirect('back');
            }
        }else{
            console.log("Password and Confirm password not natch");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }     
}

const loginData = (req,res) => {
    return res.redirect('/dash');
}

const YOM = (req,res) => {
    return res.redirect('/dash');
}

const forgetpassword = (req,res) => {
    return res.render('forgetpassword');
}

const forgotpass = async(req,res) => {
   try{
        let email = req.body.email;
        let user = await Register.findOne({email : email});
        if(user){
            let otp = Math.floor(Math.random() * 1000000);

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                  user: 'boradhitesh007@gmail.com',
                  pass: 'liprsctbyuvnkusy'
                }
              });

              let mailOptions = {
                from: 'boradhitesh007@gmail.com',
                to: email,
                subject: 'Forgot password',
                text: 'Otp :- '+otp
              };

              transporter.sendMail(mailOptions, function(error, info){
                if(error) {
                  console.log(error);
                } else {
                    let obj = {
                        email : email,
                        otp : otp
                    }
                    res.cookie('otp',obj)
                  console.log('Email sent: ' + info.response);
                  return res.redirect('/otp');
                }
              });
        }else{
            console.log("User not found");
            return res.redirect('back');
        }
   }catch(err){
        console.log(err);
        return res.redirect('back');
   }
}

const otp = (req,res) => {
    return res.render('otp');
}


const otpData = (req,res) => {
    let otp = req.cookies.otp.otp;
    if(otp == req.body.otp){
        return res.redirect('/newpass');
    }else{
        console.log("Otp is wrong");
        return res.redirect('back');
    }
}

const newpass = (req,res) => {
    return res.render('newpass');
}



const logout = (req,res) => {
    req.logout((err)=>{
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('/admin');
    })
}

const myprofile = (req, res) => {
    res.render('myprofile');
}


const updateprofile = async (req, res) => {
    try {
        let id = res.locals.userlogin._id
        if (req.file) {
            let avtar = `${imgPath}/${req.file.filename}`;
            const updateData = await Register.findByIdAndUpdate(id, Object.assign({ image: avtar }, req.body))
            if (updateData) {
                if (updateData.image !== 'uploads/default.png') {
                    fs.unlinkSync(updateData.image)
                }
            }
            return res.redirect('/dash')
        } else {
            const oldImage = res.locals.userlogin.image
            const updateOld = await Register.findByIdAndUpdate(id, Object.assign({ image: oldImage }, req.body))
            if (updateOld) {
                return res.redirect('/dash')
            }
        }
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const newpassData = async(req,res) => {
    try{
        if(req.body.password == req.body.cpassword){
            let email = req.cookies.otp.email;
            let data = await Register.findOneAndUpdate({email},{
                password : await bcrypt.hash(req.body.password,saltRounds),
            });
            if(data){
                console.log("Passworrd successfully update");
                res.clearCookie('otp');
                return res.redirect('/admin');
            }else{
                console.log("Password not update");
                return res.redirect('back'); 
            }
        }else{
            console.log("Password and confirm password not match");
            return res.redirect('back'); 
        }
           
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports = {
                    dash,
                    register,
                    login,
                    myprofile,
                    updateprofile,
                    registerData,
                    loginData,
                    forgotpass,
                    forgetpassword,
                    otp,
                    otpData,
                    YOM,
                    newpass,
                    logout,
                    newpassData
};