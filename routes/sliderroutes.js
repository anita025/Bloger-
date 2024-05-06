const express = require('express');
const routes = express.Router()
const passport = require('passport');
const sliderController = require('../controllers/slidercontroller');
const imageUpload = require('../middleware/imageupload');

// yom slider routes
routes.get('/sliderform', passport.checkAuthentication, sliderController.sliderform)



// yom slider routes
routes.post('/addSlider', imageUpload, sliderController.addSlider)
routes.get('/delete/:_id', sliderController.silderDelete)
routes.get('/sliderActive/:_id', sliderController.Active)
routes.get('/sliderDeactive/:_id', sliderController.Deactive)
routes.get('/edit/:_id', sliderController.SliderEdit)
routes.post('/updateslider/:_id', imageUpload, sliderController.updateSlider)

module.exports = routes