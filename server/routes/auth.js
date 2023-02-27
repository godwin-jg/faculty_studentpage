const { register, login, } = require("../controllers/usersController");

const router = require("express").Router();

router.post("/login", login)
router.post("/register", register)


module.exports = router;