const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
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

module.exports = mongoose.model('user_table', UserSchema)