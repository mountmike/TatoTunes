const express = require("express");
// const Router = require('express-promise-router')
const router = express.Router();
const db = require("./../db")
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")
const randomUrlGen = require("random-youtube-music-video");

// async functions for routes
const addPost = async (req, res, next) => {
    try {
        await db.query(`insert into posts (title, content, yt_url, contributor_id, date_created, like_count, comment_count) 
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 0, 0)`, [req.body.title, req.body.content, ytLinkParser(req.body.yt_url), req.session.userId]);
        res.redirect("/feed")
    } catch (err) {
        next(err)
    }
}

const removePost = async (req, res, next) => {
    try {
        await db.query('DELETE from posts where id = $1', [req.body.post_id])
        res.redirect(`/feed`)
    } catch (err) {
        next(err)
    }
}

const getPost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        let post = await db.query("SELECT posts.id AS id, full_name, title, content, yt_url, date_created, like_count, comment_count, contributor_id from posts join users on posts.contributor_id = users.id WHERE posts.id = $1", [postId]);
        post = post.rows[0];
        let comments = await db.query("SELECT comments.id AS id, full_name, post_id, user_id, content, date_created FROM comments JOIN users on comments.user_id = users.id WHERE post_id = $1", [postId]);
        comments = comments.rows;
        let likes = await db.query("SELECT * FROM likes WHERE post_id = $1", [postId]);
        likes = likes.rows;
        let hasLiked = false;
        for (let row of likes) {
            if (row.user_id === res.locals.currentUser.id) {
                hasLiked = !hasLiked;
            }
        }
        res.render("post_details", { post, comments, hasLiked })
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
        await db.query('DELETE from comments where id = $1', [req.body.commentId])

        let count = await db.query(`SELECT comment_count from posts WHERE id = $1`, [req.body.postId]);
        count = count.rows[0].comment_count
        count--

        await db.query(`UPDATE posts SET comment_count = $1 where id = $2`, [count, req.body.postId]);

        res.redirect(`/post/${req.body.postId}`)
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

function ytLinkParser(url) {
    let embedURL = "https://www.youtube.com/embed/"
    let arr = url.split("=")
    return embedURL + arr[1]
}

const getSearchResults = async (req, res, next) => {
    let input = req.query.input;
    try {
        let { rows } = await db.query(`select * from posts where content LIKE '%${input}%'`);
        res.render("search_results", { posts: rows, input })

    } catch (err) {
        next(err)
    }
}

const getPotatoSong = async (req, res, next) => {
    const potato = req.params.potato;
    try {
        const youtubeUrl = await randomUrlGen.getRandomMusicVideoUrl();
        console.log(youtubeUrl);
        res.render("get_potato_song", { yt_url_OG: youtubeUrl, yt_url: ytLinkParser(youtubeUrl), potato })
    } catch (err) {
        next(err)
    }
}

// Routes
router.get("/new", (req, res) => {
    const yt_url = req.query.yt_url;
    res.render("add_post", { yt_url})
});

router.post("/", addPost)

router.delete("/", removePost)

router.get("/combo", (req, res) => {
    res.render("mad_combo")
})

router.post("/:postId/comment", addComment)

router.delete("/:postId/comment", removeComment)

router.post("/:postId/like", addLike)

router.delete("/:postId/like", removeLike)

router.get("/combo/:potato", getPotatoSong)

router.get("/search", getSearchResults)

router.get("/:postId", getPost)




module.exports = router