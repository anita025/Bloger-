const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required : true
    },
    status:{
        type: String,
        default: 1
    }
})

module.exports = mongoose.model('blog_table', UserSchema)