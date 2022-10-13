const db = require(`../db/connection`);

module.exports = function fetchComments(article_id,) {
        return db.query(
            `SELECT author, body, comment_id, created_at, votes FROM
            (SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC) t
            ;`, [article_id])
            .then(({ rows: comments }) => {
                if (comments.length === 0) { return Promise.reject({ code: 404 }) }
                else { return comments }
            });
};
