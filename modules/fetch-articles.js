const db = require(`../db/connection`);

module.exports = function fetchArticles(filter = null) {
    if (filter) { [filter] = Object.entries(filter) }
    const dbRequest = filter ? `SELECT articles.*, comments.article_id, count(*)::int AS comment_count
    FROM comments 
    LEFT JOIN articles ON comments.article_id = articles.article_id
    JOIN users ON articles.author = users.username 
    GROUP BY comments.article_id, articles.article_id
    HAVING articles.${filter[0]} = '${filter[1]}'
    ORDER BY created_at DESC
    ;` :
    `SELECT articles.*, comments.article_id, count(*)::int AS comment_count
    FROM comments 
    LEFT JOIN articles ON comments.article_id = articles.article_id
    JOIN users ON articles.author = users.username 
    GROUP BY comments.article_id, articles.article_id
    ORDER BY created_at DESC
    ;`
    return db.query(dbRequest)
        .then(({ rows: articles }) => {
            if (articles.length === 0) {return Promise.reject({ code: 404 })}
            else { return articles }
        })
};
