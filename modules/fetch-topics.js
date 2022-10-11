const db = require(`../db/connection`);

module.exports = function fetchTopics() {
    return db.query(`SELECT * FROM topics;`)
        .then(({ rows: topics }) => {return topics})
}
