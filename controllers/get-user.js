const fetchUser = require(`../modules/fetch-user`);

module.exports = function getUser(req, res, next) {
    const { username } = req.params;
	fetchUser(username)
		.then(user => {res.status(200).send(user)})
		.catch(next);
};