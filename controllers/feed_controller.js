const express = require("express");
const router = express.Router();
const db = require("./../db")
// const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

router.get("/", (req, res) => {
    const sql = `SELECT * from posts order by id;`
    db.query(sql, (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            const posts = dbResponse.rows;
            res.render("feed", { posts })
        }
    })
});

module.exports = router
