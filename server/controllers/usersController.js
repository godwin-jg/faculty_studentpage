const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { response } = require("express");
const { collection } = require("../model/UserModel");
const jwt = require("jsonwebtoken")

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false })
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "mail already used", status: false })
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        console.log(username);
        return res.redirect("/login", { email: " " })
        //     // return res.json({ status: true, user })
    }
    catch (err) {
        next(err)
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await collection.findOne({ email })

        if (!user)
            return res.send("wrong username or password")

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.send("wrong password")
        delete user.password
        console.log(email)

        const id = email;
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
        console.log("the token is : " + token)

        const cookieOptions = {
            expires: new Date(
                Date.now() +
                process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            )
        }
        res.cookie("aswin", token, cookieOptions);
        return res.render("index", { email })
    }
    catch (err) {
        // console.log(err)
        next(err)
    }
};

module.exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.aswin) {
        try {
            const decode = await jwt.verify(
                req.cookies.aswin,
                process.env.JWT_SECRET
            )

            console.log(decode);
            req.email = decode.id;
            next();

        }
        catch (err) {
            console.log(err)
            return res.render("page-login", { err: "sorry error occured" });
        }
    }
    else {
        return res.render("page-login", { err: "not logged in" });
    }
}


module.exports.logout = async (req, res) => {
    res.cookie("aswin", "logout", {
        expires: new Date(Date.now() + 2 * 1000)
    })
    res.render("page-login");
}