const fetchComments = require(`../modules/fetch-comments`);

module.exports = function getArticle(req, res, next) {
    fetchComments(req.params.article_id)
        .then(comments => { res.status(200).send(comments) })
        .catch((err) => { next(err) });
};