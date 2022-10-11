const express = require('express');
const app = express();
const getArticle = require(`./controllers/get-article.js`);
const getTopics = require(`./controllers/get-topics`);
app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticle)

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ message: err.msg })
    } else { next(err)}
}) 

app.all('/*', (req, res, next) => {
    res.status(404)
        .send("error: path or content not found")
})

app.use((err, req, res, next) => {
    res.sendStatus(500).send("Internal Server Error");
});

module.exports = app;