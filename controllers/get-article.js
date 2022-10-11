
const fetchArticle = require(`../modules/fetch-article`);

module.exports = function getArticle(req, res, next) {
	fetchArticle(req.params.article_id)
		.then(article => {
			if (!article) {
				res.status(404).send('error: path or content not found');
			}
			res.status(200).send(article);
		})
		.catch(err => {
			next(err);
		});
};
