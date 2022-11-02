const db = require(`../db/connection`);

module.exports = function setComment(article_id, data) {
    //if (
    //    typeof data.body !== "string") { return Promise.reject({ code: 400 }) }
    //else {
        return db.query(
            `INSERT INTO comments (body, votes, author, article_id)
        VALUES ($1::TEXT, 0, $2, $3::INT)
        RETURNING *;`,
            [data.body, data.username, article_id])
            .then(({ rows: comment }) => {
                return comment[0]
            })
    //}
};
