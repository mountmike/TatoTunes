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
        let likes = await db.query("SELECT * FROM likes WHERE post_id = $1", [postId]);
        likes = likes.rows;
        res.render("post_details", { post, comments, users, likes })
    } catch (err) {
        next(err)
    }
}

const addComment = async (req, res, next) => {
    try {
        await db.query('insert into comments (post_id, user_id, content, date_created) values ($1, $2, $3, CURRENT_TIMESTAMP)', 
        [req.body.post_id, req.session.userId, req.body.content]);

        let count = await db.query(`SELECT comment_count from posts WHERE id = $1`, [req.body.post_id]);
        count = count.rows[0].comment_count
        count++
        await db.query(`UPDATE posts SET comment_count = $1 where id = $2`, [count, req.body.post_id]);

        res.redirect(`/post/${req.body.post_id}`)
    } catch (err) {
        next(err)
    }
}

const removeComment = async (req, res, next) => {
    try {
        await db.query('REMOVE from comments where id = $1', ["need to pass this id in"])

        let count = await db.query(`SELECT comment_count from posts WHERE id = $1`, [req.body.post_id]);
        count = count.rows[0].comment_count
        count--
        await db.query(`UPDATE posts SET comment_count = $1 where id = $2`, [count, req.body.post_id]);

        res.redirect(`/post/${req.body.post_id}`)
    } catch (err) {
        next(err)
    }
}

const addLike = async (req, res, next) => {
    try {
        await db.query('INSERT into likes (post_id, user_id, date_created) VALUES ($1, $2, CURRENT_TIMESTAMP)', [req.params.postId, req.session.userId]);

        let count = await db.query(`SELECT like_count from posts WHERE id = $1`, [req.params.postId]);
        count = count.rows[0].like_count
        count++
        await db.query(`UPDATE posts SET like_count = $1 where id = $2`, [count, req.params.postId]);

        res.redirect(`/post/${req.params.postId}`)
    } catch (err) {
        next(err)
    }
}

const removeLike = async (req, res, next) => {
    try {
        await db.query('DELETE FROM likes where user_id = $1 AND post_id = $2', [req.session.userId, req.params.postId]);

        let count = await db.query(`SELECT like_count from posts WHERE id = $1`, [req.params.postId]);
        count = count.rows[0].like_count
        count--
        await db.query(`UPDATE posts SET like_count = $1 where id = $2`, [count, req.params.postId]);

        res.redirect(`/post/${req.params.postId}`)
    } catch (err) {
        next(err)
    }
}

router.get("/:postId", getPost)

router.post("/:postId/comment", addComment)

router.delete("/:postId/comment", removeComment)

router.post("/:postId/like", addLike)

router.delete("/:postId/like", removeLike)


module.exports = router