# Transaction Runner

[![Test and Deploy](https://github.com/bestbrain10/slack-boto/actions/workflows/workflow.yml/badge.svg)](https://github.com/bestbrain10/slack-boto/actions/workflows/workflow.yml)

### Live API
https://slack-boto.herokuapp.com


## API SPEC

```http

POST /messages

GET /messages?user=<user_id>&limit=<num>&offset=<num>
```


## How to Install 

- Install NodeJS and NPM. Use this link and follow the steps for your own operating system https://nodejs.org/en/download/

- Install Git from https://git-scm.com/downloads

- From your terminal or command line run
    ```sh
    $ git clone git@github.com:bestbrain10/slack-boto.git

    $ cd slack-boto

    $ npm install
    ```

## Running Application as API Locally

 - create a `.env` file in the project directory using `env.example` as template

 - If you are not using a remote or cloud MongoDB environment, start your local mongoDB database or you can use the command below to start one using docker
 
 ```sh
    $ docker-compose up --scale restapi=0
 ```

 - Run `npm run start` to start the server

 - From your browser or REST client(like postman) visit `http://localhost:4500` 

 - If you make any changes, you will have to first close the running server, and the start it again using `npm run start`

## Running Test

```sh
# To run unit test
$ npm run test

# To run test coverage
$ npm run test:cov

# To run integration test
$ npm run test:e2e
```