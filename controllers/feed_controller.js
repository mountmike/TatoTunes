const express = require("express");
const router = express.Router();
const db = require("./../db")
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

// async functions for routes
const getFeed = async (req, res, next) => {
    try {
        let posts = await db.query("SELECT posts.id AS id, full_name, title, content, yt_url, date_created, like_count, comment_count from posts join users on posts.contributor_id = users.id order by id desc");
        posts = posts.rows;
        res.render("feed", { posts });
    } catch (err) {
        next(err)
    }
}

router.get("/", getFeed);


module.exports = router