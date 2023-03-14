const express = require("express");
const router = express.Router();
const db = require("./../db")
// const ensureLoggedIn = require("./../middlewares/ensure_logged_in")



router.get("/", (req, res) => {
    let posts = []
    let contributors = []
    let comments = []
    let sql = `SELECT * from posts order by id desc limit 20;`
    db.query(sql, (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            posts = dbResponse.rows;
        }
    });
    sql = `SELECT * from users order by id;`
    db.query(sql, (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            contributors = dbResponse.rows;
        }
    });
    sql = `SELECT * from comments;`
    db.query(sql, (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            comments = dbResponse.rows;
            res.render("feed", { posts, contributors, comments })
        }
    });
});

module.exports = router
