const mongoose = require("mongoose");
const staffSchema = new mongoose.Schema({
    Staff_Name: {
        type: String,
        required: true,
    },
    Proffession: {
        type: String,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    No_of_Students: {
        type: Number,
        required: true,
    },
    Year: {
        type: String,
        required: true,
    },
    Course_Name: {
        type: String,
        required: true,
    },
    Course_Code: {
        type: String,
        required: true,
    },
    Department_Handle: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model("staff", staffSchema)