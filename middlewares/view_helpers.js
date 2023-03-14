const viewHelpers = {
    dtDemoisLoggedIn: function(req, res, next) {
        res.locals.isLoggedIn = () => {
            if (req.session.userId) {
                return true
            } else {
                return false
            }
        }
        next()
    },
    countComments: function(ejsComments, ejsPost) {
        let commentCount = 0;
        for (let comment of ejsComments) {
            if (comment.post_id === ejsPost.id) {
                commentCount++
            }
        }
        return commentCount
    }
}


// function viewHelpers(req, res, next) {
//     res.locals.isLoggedIn = () => {
//         if (req.session.userId) {
//             return true
//         } else {
//             return false
//         }
//     }
//     next()
// }

module.exports = viewHelpers