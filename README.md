# This project is a simple database for

    ## blog/news articles, 
    ## comments relating to the articles,
    ## the users that made the comments, 
    ## and the topics that the articles relate to. 

## Hosted Version 

### Endpoint's

><https://antony-lester-news-articles.herokuapp.com/api/>

### Some Example Calls

><https://antony-lester-news-articles.herokuapp.com/api/articles?topic=coding&sort_by=title&order=asc>

><https://antony-lester-news-articles.herokuapp.com/api/articles/2/comments>

><https://antony-lester-news-articles.herokuapp.com/api/users>

## Local Setup & Installation

If you would like to install the project locally then please clone the repo:

><https://github.com/Antony-Lester/backend-news.git>

Once you have cloned, setup your environment and databases:

>echo "PGDATABASE = news_test" >> .env.test; echo "PGDATABASE = news" >> .env.development; npm run setup;

### Test - Check it works

This project has been created with the core Agile practice of TDD (Test-Driven-Development) using the popular Jest Testing framework to ensure that the API works as it is intended to.

>npm t

### Run - Locally - Developer Instance

To start the API:

>npm run start

It will be listening on port 9090

### Interact - Locally

#### With Chrome Browser

add JSON viewer extension to make it look fancy.

><https://chrome.google.com/webstore/detail/json-viewer>

then check out the available endpoints.

><http://127.0.0.1:9090/api>

#### With Insomnia - Locally

Install insomnia & Open.

><https://docs.insomnia.rest/insomnia/get-started>

Select GET, Enter path, & Click Send.

><127.0.0.1:9090/api>

#### Some Example Calls

><127.0.0.1:9090/api/articles?topic=coding&sort_by=title&order=asc>

><127.0.0.1:9090/api/articles/2/comments>

><127.0.0.1:9090/api/users>
