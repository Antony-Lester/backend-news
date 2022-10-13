const db = require(`../db/connection`);

module.exports = function fetchArticles(filter) {
    let dbValues = [];
    let dbRequest = `SELECT articles.*, comments.article_id, count(*)::int AS comment_count
    FROM comments 
    LEFT JOIN articles ON comments.article_id = articles.article_id
    JOIN users ON articles.author = users.username 
    GROUP BY comments.article_id, articles.article_id ` 
    if (Object.keys(filter).length > 0) {
        dbValues = Object.values(filter)
        dbRequest += `HAVING articles.topic = $1`
    }
    dbRequest += ` ORDER BY created_at DESC;`
    return db.query(dbRequest, dbValues)
        .then(({ rows: articles }) => {
            if (articles.length === 0) {return Promise.reject({ code: 404 })}
            else { return articles }
        })
};
