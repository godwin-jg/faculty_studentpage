const mongoose = require("mongoose");

const SelectCourseSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    coursename: {
        type: String,
        // required: true,
        min: 3,
        max: 100,
    },
    coursecode: {
        type: String,
        // required: true,
        unique: true,
    },
    staffname: {
        type: String,
        // required: true,
    },
    credit: {
        type: Number,
        // required: true,
    },



})

module.exports = mongoose.model("selectedCourses", SelectCourseSchema)