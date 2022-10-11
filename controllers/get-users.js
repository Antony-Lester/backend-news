const fetchUsers = require(`../modules/fetch-users`);

module.exports = function getUsers(req, res, next) {
	fetchUsers()
		.then(users => {res.status(200).send(users)})
		.catch(next);
};