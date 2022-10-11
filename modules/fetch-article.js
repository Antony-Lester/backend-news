const db = require(`../db/connection`);

module.exports = function fetchArticle(article_id) {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
        .then(({ rows: article }) => {
            if (article.length === 0) {return Promise.reject({ code: 404, msg: 'Article not found' })}
            else { return article[0] }
        });
};