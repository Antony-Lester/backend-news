const fetchEndpoints = require(`../modules/fetch-endpoints`);

module.exports = function getEndpoints(req, res, next) {
    fetchEndpoints()
        .then(endpoints => {
            res.status(200).send(endpoints)
        })
        .catch((err) => { next(err) });
};