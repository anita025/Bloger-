const express = require('express');

const routes = express.Router();

const admincontroller = require('../controllers/AdminController');
const imageUpload = require('../middleware/imageupload');

const passport = require('passport');

routes.get('/admin',admincontroller.login);
routes.get('/dash',passport.checkAuthentication,admincontroller.dash);
routes.get('/register',admincontroller.register);
routes.post('/registerData',admincontroller.registerData);
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),admincontroller.loginData);
routes.get('/forgetpassword',admincontroller.forgetpassword);
routes.post('/forgotpass',admincontroller.forgotpass);
routes.get('/otp',admincontroller.otp);
routes.post('/otpData',admincontroller.otpData);
routes.get('/newpass',admincontroller.newpass);
routes.get('/logout',admincontroller.logout);
routes.post('/newpassData',admincontroller.newpassData);
routes.get('/myprofile', passport.checkAuthentication, admincontroller.myprofile);
routes.post('/updateprofile', imageUpload, passport.checkAuthentication, admincontroller.updateprofile);

// routes.use('/user', require('./user/yomroutes'))


module.exports = routes;