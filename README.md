# To Clone & Run

## 1) Create Environment variables

you will need to add two files to root called:

> .env.development

> .env.test

these files should contain the correct database name for the environment:

```
PGDATABASE=nc_news

PGDATABASE=nc_news_test
```

## 2) Initiate modules and database

run the following to install required modules:

> npm i

then run the following to setup the database:

> npm run-script setup-dbs

## Available endpoints

>/api/topics

returns all topics.

>/api/users

returns all users.

>/api/articles/:article_id

returns a specific article.
