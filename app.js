const express = require('express');
const app = express();

app.use(express.json());

const getArticle = require(`./controllers/get-article`);
const getArticles = require(`./controllers/get-articles`);
const getTopics = require(`./controllers/get-topics`);
const getUsers = require(`./controllers/get-users`);
const getComments = require(`./controllers/get-comments`)

const patchArticle = require(`./controllers/patch-article`);

const postComment = require(`./controllers/post-comment`)

app.get('/api/topics', getTopics);
app.get('/api/articles/', getArticles)
app.get('/api/articles/:article_id', getArticle);
app.get('/api/articles/:article_id/comments', getComments)
app.get('/api/users', getUsers);

app.patch('/api/articles/:article_id', patchArticle);

app.post('/api/articles/:article_id/comments', postComment)

app.all('/*', (req, res, next) => {
    res.status(404).send({ msg: 'Not found' });
});

app.use((err, req, res, next) => {
    if (err.code === 304) {
        res.status(304).send({ msg: err.statusMessage });
    } else { next(err) };
});
app.use((err, req, res, next) => {
    if (err.code === 400 ||
        err.code === "22P02" ||
        err.code === "42703") {
        res.status(400).send({ msg: 'Bad request' });
    } else { next(err) };
});
app.use((err, req, res, next) => {
    if (err.code === 404 || err.code === "23503") {
        res.status(404).send({ msg: 'Not found' });
    } else { next(err) };
});
app.use((err, req, res, next) => {
    res.sendStatus(500).send({ msg: 'Internal server error' });
});

module.exports = app;


