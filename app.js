const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

const getEndpoints = require(`./controllers/get-endpoints`)
const getArticle = require(`./controllers/get-article`);
const getArticles = require(`./controllers/get-articles`);
const getTopics = require(`./controllers/get-topics`);
const getUsers = require(`./controllers/get-users`);
const getComments = require(`./controllers/get-comments`)
const getUser = require(`./controllers/get-user`)
const patchArticle = require(`./controllers/patch-article`);

const postComment = require(`./controllers/post-comment`)

const deleteComment = require(`./controllers/delete-comment`)

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);
app.get('/api/articles/', getArticles)
app.get('/api/articles/:article_id', getArticle);
app.get('/api/articles/:article_id/comments', getComments)
app.get('/api/users', getUsers);
app.get('/api/users/:username', getUser)
app.patch('/api/articles/:article_id', patchArticle);
app.post('/api/articles/:article_id/comments', postComment)
app.delete('/api/comments/:comment_id', deleteComment)

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
    if (err.code === 404 ||
        err.code === "23503" ||
        err.code === "42703") {
        res.status(404).send({ msg: 'Not found' });
    } else { next(err) };
});

module.exports = app;