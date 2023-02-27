const { getcourses, selectedcourses } = require("../controllers/coursesController");

const router = require("express").Router()

router.get("/getcourses", getcourses);
router.post("/selectedcourses", selectedcourses);
module.exports = router;