const express = require("express");
const router = express.Router();
const db = require("./../db");
const bcrypt = require('bcrypt');

router.get("/new", (req, res) => {
    res.render("new_user")
});

router.post("/", (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, digestedPassword) => {
            const sql = `INSERT into users (full_name, email, password_digest, is_contributor) VALUES ($1, $2, $3, $4);`
            const values = [fullName, email, digestedPassword, false]
            db.query(sql, values, (err, dbRes) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("success_new_user")
                }
            })
        })
    })
});

module.exports = router