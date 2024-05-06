const yomModel = require('../../models/user/yommodel');
const recentPostModel = require('../../models/user/postmodel');
const blogModel = require('../../models/user/blogmodel');
const contactModel = require('../../models/user/contactmodel');

const home = async (req, res) => {
    try {
        const data = await yomModel.find({})
        const postData = await recentPostModel.find({}).sort({ _id: -1 })
        const blogData = await blogModel.find({})
        res.render('./user/index', { data, postData,blogData})
    } catch (error) {
        return console.log(error.message);
        
    }
}

const wholeBlogPage = async (req, res) => {
    try {
        const { params: { _id } } = req
        const blogData = await blogModel.findById({ _id })
        res.render('./user/wholeblog', { blogData })
    } catch (error) {
        return console.log(error.message);
    }
}

const contactPage = async (req, res) => {
    try {
        await res.render('./user/contact')
    } catch (error) {
        return console.log(error.message);
    }
}

const addContact = async (req, res) => {
    try {
        const addContact = await contactModel.create(req.body)
        if (addContact) {
            return res.redirect('back')
        }
        console.log(addContact);
    } catch (error) {
        return console.log(error.message);
    }
}

module.exports = { home,wholeBlogPage,contactPage,addContact }