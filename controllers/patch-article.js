const updateArticle = require(`../modules/update-article`);

module.exports = function patchArticle(req, res, next) {
    updateArticle(req.params.article_id, req.body)
        .then(updatedArticle => {res.status(202).send(updatedArticle)})
        .catch((err) => {next(err)});
};