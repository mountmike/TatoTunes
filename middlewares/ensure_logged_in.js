function ensureLoggedIn(req, res, next) {
    if (req.session.userId) return next()
    res.render("permission_denied")
}

module.exports = ensureLoggedIn