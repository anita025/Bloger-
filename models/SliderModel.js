const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title :{
        type : String,
        required : true,
    },
    sub_title : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model("sliderdata",schema);