const db = require(`../db/connection`);


module.exports = function updateArticle(article_id, newContent) {
        return db.query(`UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *`, [article_id, newContent.inc_votes])
            .then(({ rows: article }) => { return article[0] })
            .catch(() => { return Promise.reject({ code: 304, msg: 'Not Modified' }) })
}

