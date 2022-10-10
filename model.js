const db = require(`${__dirname}/db/connection`);

function fetchTopics () {
    return db.query(`SELECT * FROM topics;`)
        .then(({ rows: topics }) => {return topics})
        .catch((err) => {Promise.reject(err)})
}

module.exports = fetchTopics;