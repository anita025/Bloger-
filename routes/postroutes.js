const express = require('express');
const routes = express.Router()
const passport = require('passport');
const imageUpload = require('../middleware/imageupload');

const recentpostController = require('../controllers/postcontroller');

// recent post slider routes
routes.get('/postform', passport.checkAuthentication, recentpostController.postform)

// recent post slider routes
routes.post('/addpost',imageUpload ,recentpostController.addpost)
routes.get('/deletePost/:_id' ,recentpostController.postDelete)
routes.get('/editPost/:_id' ,recentpostController.postEdit)
routes.post('/updatepost/:_id',imageUpload ,recentpostController.updatePost)
routes.get('/postActive/:_id' ,recentpostController.Active)
routes.get('/postDeactive/:_id' ,recentpostController.Deactive)


module.exports = routes