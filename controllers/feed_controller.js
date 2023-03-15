const express = require("express");
const Router = require('express-promise-router')
const router = new Router();
const db = require("./../db")
// const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

const getFeed = async (req, res, next) => {
    try {
        let posts = await db.any("SELECT * from posts order by id desc limit 20;");
        let users = await db.any("SELECT * from users order by id;");
        let comments = await db.any("SELECT * from comments;");
        res.render("feed", { posts, users, comments });
    } catch (err) {
        next(err)
    }
}

router.get("/", getFeed);

module.exports = router
