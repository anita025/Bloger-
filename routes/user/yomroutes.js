const routes = require('express').Router();
const passport = require('passport');

const yomController = require('../../controllers/user/yomcontroller');

routes.get('/', yomController.home)
routes.get('/whole-blog-page/:_id', yomController.wholeBlogPage)
routes.get('/contact-page', yomController.contactPage)
routes.post('/addcontact', yomController.addContact)

routes.use('/', require('../index'))
routes.use('/', require('../sliderroutes'))
routes.use('/', require('../postroutes'))
routes.use('/', require('../blogroutes'))

module.exports = routes;