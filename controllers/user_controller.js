const express = require("express");
const router = express.Router();
const db = require("./../db");
const bcrypt = require('bcrypt');
const ensureLoggedIn = require("../middlewares/ensure_logged_in")

// async functions for routes
const addNewUser = async (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, digestedPassword) => {
                db.query('INSERT INTO users (full_name, email, password_digest, is_contributor) VALUES ($1, $2, $3, $4)', [fullName, email, digestedPassword, true])
                res.render("success_new_user")
            })
        })
    } catch (err) {
        next(err)
    }
}

const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        let user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
        user = user.rows[0];
        let comments = await db.query("SELECT * FROM comments WHERE user_id = $1", [userId]);
        comments = comments.rows;
        let posts = await db.query("SELECT * FROM posts WHERE contributor_id = $1", [userId]);
        posts = posts.rows;

        res.render("user_profile", { user, comments, posts })
    } catch (err) {
        next(err)
    }
}

router.get("/new", (req, res) => {
    res.render("new_user")
});

router.get("/profile/:userId", ensureLoggedIn, getUserProfile)

router.post("/", addNewUser)

module.exports = router