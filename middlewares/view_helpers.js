function viewHelpers(req, res, next) {
    res.locals.isLoggedIn = () => {
        if (req.session.userId) {
            return true
        } else {
            return false
        }
    }
    res.locals.myFunction = () => {
        console.log("my function");
    }
    next()
}

module.exports = viewHelpers