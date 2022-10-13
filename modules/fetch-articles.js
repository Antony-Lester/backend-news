const db = require(`../db/connection`);

module.exports = function fetchArticles(filter = null) {
    const dbValues = [];
    let dbRequest = `SELECT articles.*, comments.article_id, count(*)::int AS comment_count
    FROM comments 
    LEFT JOIN articles ON comments.article_id = articles.article_id
    JOIN users ON articles.author = users.username 
    GROUP BY comments.article_id, articles.article_id ` 
    if (filter) {
        [filter] = Object.entries(filter)
        dbValues.push(filter[0])
        db.Values.push(filter[1])
        dbRequest += `HAVING articles.$1 = '$2'`}
    dbRequest += `ORDER BY created_at DESC;`
    return db.query(dbRequest, dbValues)
        .then(({ rows: articles }) => {
            if (articles.length === 0) {return Promise.reject({ code: 404 })}
            else { return articles }
        })
};
