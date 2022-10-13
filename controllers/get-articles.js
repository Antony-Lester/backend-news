const fetchArticles = require(`../modules/fetch-articles`);

module.exports = function getArticles(req, res, next) {
    fetchArticles(req.query) 
        .then(articles => { res.status(200).send(articles) })
        .catch((err) => {
            next(err)
        });
};