const express = require("express");
const router = express.Router();
const db = require("./../db")
// const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

router.get("/:postId", (req, res) => {
    const postId = req.params.postId;
    const sql = `select * from posts where id = $1`;
    db.query(sql, [postId], (err, dbRes) => {
        if (err) {
            console.log(err);
        } else {
            const post = dbRes.rows[0];
            res.render("post_details", { post })
        }
    });
})

module.exports = router