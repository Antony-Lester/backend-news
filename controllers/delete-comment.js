const removeComment = require(`../modules/remove-comment`);

module.exports = function deleteComment(req, res, next) {
    removeComment(req.params.comment_id)
        .then(() => {res.status(204).send()})
        .catch((err) => { next(err) });
};

