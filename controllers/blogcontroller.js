const blogModel = require('../models/user/blogmodel');

const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads");

const blogform = async (req, res) => {
    try {
        const data = await blogModel.find({})
        if (data) {
            return res.render('./blogform', { data })
        }
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const addblog = async (req, res) => {
    try {
        let image = `${imgPath}/${req.file.filename}`;
        const addBlog = await blogModel.create(Object.assign({ image }, req.body))
        if (addBlog) {
            return res.redirect('back')
        }
        console.log(addBlog);
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const blogDelete = async (req, res) => {
    try {
        const { params: { _id } } = req
        const deleteData = await blogModel.findByIdAndDelete({ _id })
        fs.unlinkSync(deleteData.image)
        await res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const blogEdit = async (req, res) => {
    try {
        const { params: { _id } } = req
        const data = await blogModel.findById({ _id })
        res.render('./updateBlog', { data })
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const updateBlog = async (req, res) => {
    try {
        const { params: { _id } } = req
        if (req.file) {
            let image = `${imgPath}/${req.file.filename}`;
            const updateData = await blogModel.findByIdAndUpdate(_id, Object.assign({ image }, req.body))
            if (updateData) {
                fs.unlinkSync(updateData.image)
            }
            res.redirect('/blogform')
        } else {
            let obj = req.body
            const data = await blogModel.findByIdAndUpdate(_id, obj)
            if (data) {
                return res.redirect('/blogform')
            }
        }
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const Active = async (req, res) => {
    try {
        const { params: { _id } } = req
        await blogModel.findByIdAndUpdate(_id, {
            status: '0'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const Deactive = async (req, res) => {
    try {
        const { params: { _id } } = req
        await blogModel.findByIdAndUpdate(_id, {
            status: '1'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

module.exports = { blogform, addblog, blogDelete, blogEdit, updateBlog, Active, Deactive }