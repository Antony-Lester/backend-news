const db = require(`../db/connection`);

module.exports = function removeComment(comment_id) {
        return db.query(
            `DELETE FROM comments
                WHERE comment_id = $1 RETURNING *;`, [comment_id])
            .then(({ rows: comment }) => {
                if (comment.length === 0) { return Promise.reject({ code: 404 }) }
            })
};

