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
$ docker-compose -f docker/postgresql.yml up -d
```

After that, you have to copy the default environment file and edit it.

```bash
cp example.env .env
```

One part that you must fill out in the env file in order to start the server is the Algolia search app.

You can create a free app on Algolia and then fill the following with the details of you Algolia app.

```dotenv
## Search
SEARCH_APP_ID=youAlgoliaAppId
SEARCH_APP_ADMIN_KEY=yourAlgoliaAdminKey
```

And finally you start the server :

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

# Options

In the server, they are some option that you can toggle with the env file.

## Auth

You can enable the need for auth in the server.

**The social network doesn't work yet ! PR welcome !**

Here is the config for the auth.

```dotenv
## AUTHENTICATION [JWT]
JWT_SECRET=bananana

## Auth
IS_AUTH_ENABLED=false

IS_NEW_USER_HAVE_WRITE_ACCESS=true

LOCAL_REGISTER_ENABLED=true

DEFAULT_ADMIN_LOGIN=admin@localhost.fr
DEFAULT_ADMIN_PASSWPRD=ADMIN
```

Settings the `JWT_SECRET` variable is used to crypt the tokens. This **have to be** a complex string.

To enable auth system, set the `IS_AUTH_ENABLED` to `true`. When the server first start, it will create a default admin user using the config provided.

You can disable the local register so only admin can create new users.

An user can be an admin or not. An admin can do everything in the app.

An user can have 3 "Role" :

- `ROLE_USER` enable the user to see data in the app
- `ROLE_EDIT_FLOW` enable the user to create, edit and delete flow
- `ROLE_EDIT_APPS` enable the user to create, edit and delete apps

If the `IS_NEW_USER_HAVE_WRITE_ACCESS` flag is set to `true`, new users will be have all 3 roles.
If not, a new user will only be able to see the data.
