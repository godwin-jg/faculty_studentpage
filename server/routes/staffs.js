const { addstaffs } = require("../controllers/staffsController");

const router = require("express").Router()

router.post("/getstaffs", getstaffs);

module.exports = router;