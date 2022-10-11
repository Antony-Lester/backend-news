const express = require('express');
const app = express();

app.use(express.json());

const getArticle = require(`./controllers/get-article.js`);
const getTopics = require(`./controllers/get-topics`);
const getUsers = require(`./controllers/get-users`)

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);
app.get('/api/users', getUsers);

app.all('/*', (req, res, next) => {
    res.status(404).send({ msg: "Not found" })
})
//400
app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid id' })
    } else {next(err)}
}) 
//404
app.use((err, req, res, next) => {
    if (err.code === 404) {
        res.status(404).send({ msg: err.msg })
    } else {next(err)}
}) 
//500
app.use((err, req, res, next) => {
    res.sendStatus(500).send({ msg: "Internal server error" });
});

module.exports = app;
