
const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
    coursename: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    coursecode: {
        type: String,
        required: true,
        unique: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    slots: {
        type: Number,
        required: true,
    },
    professional_elective_for: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },


})

module.exports = mongoose.model("Courses", coursesSchema)