//const setComment = require(`../modules/set-comment`);

module.exports = function postComment(req, res, next) {
    console.log("IN CONTROL", req.params.article_id, req.body)
    setComment(req.params.article_id, req.body)
        .then(setComment => {res.status(202).send(setComment)})
        .catch((err) => {next(err)});
};