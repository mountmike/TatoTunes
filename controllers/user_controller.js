const express = require("express");
const Router = require('express-promise-router')
const router = new Router();
const db = require("./../db");
const bcrypt = require('bcrypt');

// async functions for routes
const addNewUser = async (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, digestedPassword) => {
                db.query('INSERT INTO users (full_name, email, password_digest, is_contributor) VALUES ($/fullName/, $/email/, $/digestedPassword/, $/isCon/)', {
                    fullName,
                    email,
                    digestedPassword,
                    isCon: false
                });
                res.render("success_new_user")
            })
        })
    } catch (err) {
        next(err)
    }
}

router.get("/new", (req, res) => {
    res.render("new_user")
});

router.post("/", addNewUser)

module.exports = router