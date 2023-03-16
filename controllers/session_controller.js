const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("./../db");
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

// async functions for routes
const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        let user = await db.query(`SELECT * from users where email = $1`, [email]);
        user = user.rows;
        console.log(user);
        if (user.length === 0) {
            return res.redirect("/login") // no records found, stay at login page
        } else {
            user = user[0];
            bcrypt.compare(password, user.password_digest, (err, result) => {
                if (result) {
                    req.session.userId = user.id
                    res.redirect("/feed");
                } else {
                    res.redirect("/login");
                }
            })
        }
    } catch (err) {
        next(err)
    }
}

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/feed");
    })
}

router.post("/", login, );

router.delete("/", logout);

module.exports = router