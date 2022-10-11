const fetchTopics = require(`../modules/fetch-topics`);

module.exports = function getTopics(req, res, next) {
	fetchTopics()
		.then(topics => {res.status(200).send(topics)})
		.catch(next);
};