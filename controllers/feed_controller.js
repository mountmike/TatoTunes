const express = require("express");
const router = express.Router();
const db = require("./../db")
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

// async functions for routes
const getFeed = async (req, res, next) => {
    try {
        let posts = await db.query("SELECT * from posts order by id desc limit 20;");
        posts = posts.rows;
        let users = await db.query("SELECT * from users order by id;");
        users = users.rows;
        let comments = await db.query("SELECT * from comments;");
        coments = comments.rows;
        res.render("feed", { posts, users, comments });
    } catch (err) {
        next(err)
    }
}

router.get("/", getFeed);


module.exports = router
