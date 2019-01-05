<p align="center">
    <a href="https://forthebadge.com/">
        <img alt="build with love" src="https://forthebadge.com/images/badges/built-with-love.svg">
    </a>
    <a href="https://forthebadge.com/">
        <img alt="build with love" src="https://forthebadge.com/images/badges/made-with-javascript.svg">
    </a>
</p>
<p align="center">
    <a href="https://circleci.com/gh/beaussart/flow-mapper">
        <img src="https://img.shields.io/circleci/project/github/beaussart/flow-mapper.svg?style=flat-square"
             alt="Build Status">
    </a>
    <a href="https://codecov.io/gh/beaussart/flow-mapper">
        <img src="https://img.shields.io/codecov/c/github/beaussart/flow-mapper.svg?style=flat-square"
             alt="Code coverage">
    </a>
    <a href="https://gitmoji.carloscuesta.me">
        <img src="https://img.shields.io/badge/commit%20convention-gitmoji-green.svg?style=flat-square"
             alt="Gitmoji">
    </a>
    <a href="#badge">
        <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
    </a>
</p>

## Description

This application is created to map the apps and the way they communicate.

This project have the server and the client in the same repository.

The server is located in the `src/server` folder and is made with the following technologies :

- nestjs
- typeorm
- pasportjs
- algolia
- swagger

The client is located in the `src/client` folder and is made with Angular.

## Installation

```bash
$ yarn install
```

## Running the client

In order to run the client, do the following :

```bash
$ yarn client:start
```

## Running the server

To run the server, you have to start the database first :

```bash
$ docker-compose -f docker/postresql.yml up -d
```

Then, start the server :

```bash
# development
$ yarn server:start

# watch mode
$ yarn server:watch
```

## Test

```bash
# unit tests
$ yarn client:test
$ yarn server:test

# e2e tests
$ yarn server:e2e
```

## Todos

- [ ] auth   
  - [ ] facebook  
  - [ ] google  
  - [ ] twitter  
  - [x] local
- [ ] flow
- [ ] apps