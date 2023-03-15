const express = require("express");
// const Router = require('express-promise-router')
const router = express.Router();
const db = require("./../db")
// const ensureLoggedIn = require("./../middlewares/ensure_logged_in")


// async functions for routes
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        let post = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);
        post = post.rows[0];
        let users = await db.query("SELECT * from users order by id");
        users = users.rows;
        let comments = await db.query("SELECT * FROM comments WHERE post_id = $1 order by user_id", [postId]);
        comments = comments.rows;
        res.render("post_details", { post, comments, users })
    } catch (err) {
        next(err)
    }
}

const addComment = async (req, res, next) => {
    try {
        await db.query('insert into comments (post_id, user_id, content, date_created) values ($1, $2, $3, CURRENT_TIMESTAMP)', 
        [req.body.post_id, req.session.userId, req.body.content]);
        let commentCount = await db.query(`SELECT comment_count from posts WHERE id = $1`, [req.body.post_id]);
        commentCount = commentCount.rows[0].comment_count
        commentCount++
        console.log("commentcoutn ", commentCount);
        
        await db.query(`UPDATE posts SET comment_count = $1 where id = $2`, [commentCount, req.body.post_id]);
        res.redirect(`/post/${req.body.post_id}`)
    } catch (err) {
        next(err)
    }
}

const addLike = async (req, res, next) => {
    try {
        await db.query('insert into likes (post_id, user_id, date_created) values ($1, $2, CURRENT_TIMESTAMP)', 
        [req.body.post_id, req.session.userId]);
        let commentCount = await db.query(`SELECT comment_count from posts WHERE id = $1`, [req.body.post_id]);
        commentCount = commentCount.rows[0].comment_count
        commentCount++
        console.log("commentcoutn ", commentCount);
        
        await db.query(`UPDATE posts SET comment_count = $1 where id = $2`, [commentCount, req.body.post_id]);
        res.redirect(`/post/${req.body.post_id}`)
    } catch (err) {
        next(err)
    }
}

router.get("/:postId", getPost)

router.post("/:postId/comment", addComment)

router.post("/:postId/like", addLike)


module.exports = router