const Staff = require("../model/StaffModel");
module.exports.getstaff = async (req, res, next) => {
    try {
        const staffs = Staff.find({})

        const projectedStaffs = staffs.map((staffs) => {
            console.log(staffs);
        })
        return res.render("");
    } catch (err) {
        console.log(err)
        next(err)
    }
}