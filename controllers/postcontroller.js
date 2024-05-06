const recentPostModel = require('../models/user/postmodel');

const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads");

const postform = async (req, res) => {
    try {
        const data = await recentPostModel.find({})
        res.render('./postform',{data})
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const addpost = async(req, res)=>{
    try {
        let image = `${imgPath}/${req.file.filename}`;
        const addPost = await recentPostModel.create(Object.assign({ image }, req.body))
        if (addPost) {
            return res.redirect('back')
        }
        console.log(addPost);
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const postDelete = async (req, res) => {
    try {
        const { params: { _id } } = req
        const deleteData = await recentPostModel.findByIdAndDelete({ _id })
        fs.unlinkSync(deleteData.image)
        await res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const postEdit = async (req, res) => {
    try {
        const { params: { _id } } = req
        const data = await recentPostModel.findById({ _id })
        res.render('./updatePost', { data })
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const updatePost = async (req, res) => {
    try {
        const { params: { _id } } = req
        if (req.file) {
            let image = `${imgPath}/${req.file.filename}`;
            const updateData = await recentPostModel.findByIdAndUpdate(_id, Object.assign({ image }, req.body))
            if (updateData) {
                fs.unlinkSync(updateData.image)
            }
            res.redirect('/postform')
        } else {
            let obj = req.body
            const data = await recentPostModel.findByIdAndUpdate(_id, obj)
            if (data) {
                return res.redirect('/postform')
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
        await recentPostModel.findByIdAndUpdate(_id, {
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
        await recentPostModel.findByIdAndUpdate(_id, {
            status: '1'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

module.exports = { postform, addpost, postDelete, postEdit, updatePost, Active, Deactive }