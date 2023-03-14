const express = require("express");
const { values } = require("underscore");
const router = express.Router();
const db = require("./../db")
// const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

router.get("/:postId", (req, res) => {
    const postId = req.params.postId;
    let post = []
    let comments = []
    let users = []
    let sql = `select * from posts where id = $1`;
    db.query(sql, [postId], (err, dbRes) => {
        if (err) {
            console.log(err);
        } else {
            post = dbRes.rows[0];
        }
    });
    sql = `select * from comments where post_id = $1`;
    db.query(sql, [postId], (err, dbRes) => {
        if (err) {
            console.log(err);
        } else {
            comments = dbRes.rows;
        }
    });
    sql = `SELECT * from users order by id;`
    db.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err);
        } else {
            users = dbRes.rows;
            res.render("post_details", { post, comments, users })
        }
    });
});

router.post("/:postId/comment", (req, res) => {
    const sql = `insert into comments (post_id, user_id, content, date_created) values ($1, $2, $3, CURRENT_TIMESTAMP);`;
    const values = [req.body.post_id, res.locals.currentUser.id, req.body.content]
    console.log(sql, values);
    db.query(sql, values, (err, dbRes) => {
        if (err) {
            console.log(err);
        } else {
            console.log(dbRes);
            res.redirect(`/post/${req.body.post_id}`)
        }
        
    })
})

module.exports = router