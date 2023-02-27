const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const path = require('path')
const auth = require("./routes/auth")
const bodyParser = require('body-parser');
const courseRoutes = require("./routes/courses");
const { isLoggedIn } = require('./controllers/usersController');
const cookieParser = require('cookie-parser');


const app = express();
require("dotenv").config();
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use("/public", express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/courses", isLoggedIn, courseRoutes);


app.get('/login', (req, res) => {
    res.render('page-login', { err: " " })
})

app.get('/', isLoggedIn, (req, res) => {
    const email = req.email;
    res.render('index', { email });
})
app.get('/home', isLoggedIn, (req, res) => {
    const email = req.email;
    res.render('layout-one-column', { email });
})


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
}).then(() => {
    console.log("Db connected successfully")
}).catch((err) => {
    console.log(err.message);
})


const server = app.listen(process.env.PORT, () => {
    console.log(`server started on Port ${process.env.PORT}`)

})