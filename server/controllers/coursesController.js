const nodemailer = require('nodemailer')
const Courses = require("../model/CourseModel");
const selectedCourse = require("../model/SelectCourseModel");
const Staffs = require("../model/StaffModel");
module.exports.getcourses = async (req, res, next) => {
    try {
        const sendmail = () => {
            emailjs.init("user_8DzibTnTH9hMJoLvutA8w")
        }

        const courses = await Courses.find({})
        const staffs = await Staffs.find({})


        return res.render("layout-one-column", { courses, staffs, email: req.email });
        // res.json()
    }
    catch (err) {
        next(err);
    }
}
module.exports.selectedcourses = async (req, res, next) => {

    try {
        const { option1, option2 } = req.body;
        console.log(option1, option2);
        const courses = await Courses.find({
            coursecode: option1
        })
        const staffs = await Staffs.find({
            staffname: option2,
        })

        const registerCourse = await selectedCourse.create({
            email: req.email,
            coursecode: option1,
            coursename: courses.coursename,
            credit: courses.credit,
            staffname: option2,
        })

        courses = await Courses.updateOne({
            coursecode: option1,
        }, {
            $inc: {
                slot: -1,
            }
        })
        console.log(staffs);


        // console.log(courses.credit);
        return res.send("REGISTERED SUCCESSFULLY");
        // return res.render("layout-one-column", { courses, staffs, email: req.email })
    }
    catch (err) {
        console.log(err)
        next()
    }
}