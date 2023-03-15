const express = require("express");
const Router = require('express-promise-router')
const router = new Router();
const bcrypt = require('bcrypt');
const db = require("./../db");

// async functions for routes
const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        let user = await db.any(`SELECT * from users where email = $1`, email);
        if (user.length === 0) {
            return res.redirect("/login") // no records found, stay at login page
        } else {
            user = user[0];
            bcrypt.compare(password, user.password_digest, (err, result) => {
                if (result) {
                    console.log(result);
                    req.session.userId = user.id
                    req.session.email = user.email
                    req.session.fullName = user.full_name
                    res.redirect("/feed")
                } else {
                    res.redirect("/login");
                }
            })
        }

    } catch (err) {
        next(err)
    }
}



router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/", login);

router.delete("/sessions", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
});

module.exports = router