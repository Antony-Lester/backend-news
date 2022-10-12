const db = require(`../db/connection`);

module.exports = function fetchArticle(article_id) {
    return db.query(
        `SELECT articles.*, comments.article_id, count(*)::int AS comment_count
        FROM comments 
        LEFT JOIN articles ON comments.article_id = articles.article_id
        WHERE comments.article_id = $1
        GROUP BY comments.article_id, articles.article_id;`, [article_id])
        .then(({ rows: article }) => {
            if (article.length === 0) { return Promise.reject({ code: 404 }) }
            else { return article[0] }
        });
};
