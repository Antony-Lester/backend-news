const setComment = require(`../modules/set-comment`);

module.exports = function postComment(req, res, next) {
    setComment(req.params.article_id, req.body)
        .then(setComment => {res.status(202).send(setComment)})
        .catch((err) => {next(err)});
};

