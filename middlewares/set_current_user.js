const db = require("../db")

function setCurrentUser(req, res, next) {
    const { userId } = req.session
    res.locals.currentUser = {}

    if (userId) {
        //user is logged in - setup currentUser obj
        const sql = `SELECT * from users where id = ${userId};`
        db.query(sql, (err, dbResponse) => {
            if (err) {
                console.log(err);
            } else {
                res.locals.currentUser = dbResponse.rows[0];
                next();
            }
        })
    } else {
        next()
    }  
}

module.exports = setCurrentUser