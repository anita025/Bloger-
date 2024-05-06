const yomModel = require('../models/user/yommodel');

const path = require("path");
const fs = require('fs');
let imgPath = path.join("uploads");

const sliderform = async (req, res) => {
    try {
        const data = await yomModel.find({})
        res.render('sliderform', { data })
    } catch (error) {
        console.log(error.message);
    }
}

const addSlider = async (req, res) => {
    try {
        let image = `${imgPath}/${req.file.filename}`;
        const addSlider = await yomModel.create(Object.assign({ image }, req.body))
        if (addSlider) {
            return res.redirect('back')
        }
        console.log(addSlider);
    } catch (error) {
        return console.log(error.message);
    }
}

const silderDelete = async (req, res) => {
    try {
        const { params: { _id } } = req
        const deleteData = await yomModel.findByIdAndDelete({ _id })
        fs.unlinkSync(deleteData.image)
        await res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const Active = async (req, res) => {
    try {
        const { params: { _id } } = req
        await yomModel.findByIdAndUpdate(_id, {
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
        await yomModel.findByIdAndUpdate(_id, {
            status: '1'
        })
        res.redirect('back')
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const SliderEdit = async (req, res) => {
    try {
        const { params: { _id } } = req
        const data = await yomModel.findById({ _id })
        res.render('updateSlider', { data })
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}

const updateSlider = async (req, res) => {
    try {
        const { params: { _id } } = req
        if (req.file) {
            let image = `${imgPath}/${req.file.filename}`;
            const updateData = await yomModel.findByIdAndUpdate(_id, Object.assign({ image }, req.body))
            if (updateData) {
                fs.unlinkSync(updateData.image)
            }
            res.redirect('/sliderform')
        } else {
            let obj = req.body
            const data = await yomModel.findByIdAndUpdate(_id, obj)
            if (data) {
                return res.redirect('/sliderform')
            }
        }
    } catch (error) {
        console.log(error.message);
        res.redirect('back')
    }
}


module.exports = { sliderform, addSlider, silderDelete, Active, Deactive, SliderEdit, updateSlider}