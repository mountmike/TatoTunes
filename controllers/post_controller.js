const express = require("express");
// const { values } = require("underscore");
const Router = require('express-promise-router')
const router = new Router();
const db = require("./../db")
// const ensureLoggedIn = require("./../middlewares/ensure_logged_in")


// async functions for routes
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        let post = await db.one("SELECT * FROM posts WHERE id = $1", postId);
        let users = await db.any("SELECT * from users order by id");
        let comments = await db.any("SELECT * FROM comments WHERE post_id = $1", postId);
        res.render("post_details", { post, comments, users })
    } catch (err) {
        next(err)
    }
}

router.get("/:postId", getPost)

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