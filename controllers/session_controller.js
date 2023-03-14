const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("./../db");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = `SELECT * from users where email = '${email}';`
    db.query(sql, (err, dbRes) => {
        console.log(`dbRes ${dbRes.rows}`);
        if (dbRes.rows.length === 0) {
            return res.redirect("/login") // no records found, stay at login page
        } else {
            const user = dbRes.rows[0]
            bcrypt.compare(password, user.password_digest, (err, result) => {
                if (result) {
                    req.session.userId = user.id
                    req.session.email = user.email
                    req.session.fullName = user.full_name
                    req.session.isContributor = user.is_contributor
                    res.redirect("/feed")
                } else {
                    res.redirect("/login");
                }
            })
        }
    })
});

router.delete("/sessions", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
});

module.exports = router