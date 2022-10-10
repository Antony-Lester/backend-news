const express = require('express');
const app = express();
const getTopics = require(`${__dirname}/controller`);

app.use(express.json());

app.get('/api/topics', getTopics);

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ message: err.msg })
    } else { next(err)}
}) 
app.use((err, req, res, next) => {
    res.sendStatus(500).send({ message: "internal server error" });
});

module.exports = app;