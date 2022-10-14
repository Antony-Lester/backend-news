const db = require(`../db/connection`);

module.exports = function fetchArticles(query) {
    let dbRequest = `SELECT articles.*, comments.article_id, count(*)::int AS comment_count
    FROM comments 
    LEFT JOIN articles ON comments.article_id = articles.article_id
    JOIN users ON articles.author = users.username 
    GROUP BY comments.article_id, articles.article_id ` 
    if (Object.keys(query).includes('topic')) {
        dbRequest += `HAVING articles.topic = '${query.topic}'`
    }
    if (query.hasOwnProperty('sort_by')) {
        dbRequest += ` ORDER BY articles.${query.sort_by}`
        if (query.hasOwnProperty('order') && query.order === "asc") { dbRequest += ` ASC;` }
        else { dbRequest += ` DESC;` }      
    }
    else { dbRequest += ` ORDER BY created_at DESC;` }
    return db.query(dbRequest)
        .then(({ rows: articles }) => {
            if (articles.length === 0) {return Promise.reject({ code: 404 })}
            else {
                return articles
            }
        })
};
