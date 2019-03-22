# Cake-Mini-POS [![Build Status](https://travis-ci.org/NuwanTharaka/mini-pos.svg?branch=develop)](https://travis-ci.org/NuwanTharaka/mini-pos) ![Website](https://img.shields.io/website/https/cake-mini-pos.herokuapp.com.svg?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online)

Mini Point of Sale system for restaurants.

The deployed web application is available on [cake-mini-pos.herokuapp.com](https://cake-mini-pos.herokuapp.com/)

## Quick Overview

Currently there are two branches of the project are maintained, <br>

- _`master`_ for the deployment (production)
- _`develop`_ containing source code under development

The default is set to _`develop`_. It is recommended to clone the develop branch to make sure you receive most recent updates to the source code.

In the deployed version of the app, sign in option is disabled on UI in order to avoid spamming (although it is available over API).<br>
Use following credentials to login.

_Email:`test@test.com`_ <br>
_Password:`test`_

To run a local version of the web app, clone the repository and run following commands at root of the repository.<br>
**You’ll need to have Node 8.10.0 or later on your local development machine**

```sh
npm install
npm install --prefix client
npm run dev
```

It will launch a development version of the app.

### Get Started

You need few softwares and packages to launch a functional local **Cake-Mini-POS** application.<br>

- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

Now you can run a development version of the application and perform tests locally without affecting production databases and servers.

## Run Tests

Back-end and front-end both are covered with unit and integration tests to ensure the proper functionality of the application.<br>
To test **Back-end API** at root folder run

```sh
npm run test
```

To perform **Front-end** tests, run ( assuming that you are at root folder )

```sh
npm run test --prefix client
```

That will cover all the reducers and actions except component UI tests.

### Test Coverage

Individual coverage reports for back-end and front-end are available.

```
mini-pos
├── coverage
│   └── lcov-report
│       └── index.html   **Back-end**
└── client
    └── coverage
        └── index.html   **Front-end**
```

### Code Quality

To maintain the code clean and consistent, ESlint is used. To perform lint test on **Back-end** code, run

```sh
npm run lint
```

For **Front-end**

```sh
npm run lint --prefix client
```

## Documentation

Documentation for back-end API is available on [Swagger Hub](https://app.swaggerhub.com/apis-docs/NuwanTharaka/Cake-mini-POS-documentation/1.0.0).

## File Structure

Important files in the source code are listed below for convenience.

```sh
mini-pos
├── api
│   ├── controllers
│   │   ├── carts.js
│   │   ├── items.js
│   │   └── user.js
│   ├── middleware
│   │   ├── check-auth.js
│   │   ├── check-user.js
│   │   └── image_uploader.js
│   └── routes
│       ├── carts.js
│       ├── items.js
│       └── user.js
├── client
│   ├── coverage
│   │   ├── clover.xml
│   │   ├── coverage-final.json
│   │   ├── lcov.info
│   │   └── lcov-report
│   │       ├── actions
│   │       │   ├── cartActions.js.html
│   │       │   ├── cartListActions.js.html
│   │       │   ├── index.html
│   │       │   ├── itemActions.js.html
│   │       │   ├── loginAction.js.html
│   │       │   └── types.js.html
│   │       ├── base.css
│   │       ├── cartListReducer.js.html
│   │       ├── cartReducer.js.html
│   │       ├── coverage
│   │       │   └── lcov-report
│   │       │       ├── index.html
│   │       │       ├── prettify.js.html
│   │       │       └── sorter.js.html
│   │       ├── index.html
│   │       ├── index.js.html
│   │       ├── itemReducer.js.html
│   │       ├── loginReducer.js.html
│   │       ├── prettify.css
│   │       ├── prettify.js
│   │       ├── prettify.js.html
│   │       ├── reducers
│   │       │   ├── cartListReducer.js.html
│   │       │   ├── cartReducer.js.html
│   │       │   ├── index.html
│   │       │   ├── index.js.html
│   │       │   ├── itemReducer.js.html
│   │       │   └── loginReducer.js.html
│   │       ├── sort-arrow-sprite.png
│   │       ├── sorter.js
│   │       ├── sorter.js.html
│   │       └── src
│   │           ├── actions
│   │           │   ├── cartActions.js.html
│   │           │   ├── cartListActions.js.html
│   │           │   ├── index.html
│   │           │   ├── itemActions.js.html
│   │           │   ├── loginAction.js.html
│   │           │   └── types.js.html
│   │           ├── App.js.html
│   │           ├── components
│   │           │   ├── AppContainer.js.html
│   │           │   ├── AppNavBar.js.html
│   │           │   ├── cart.js.html
│   │           │   ├── CartList.js.html
│   │           │   ├── index.html
│   │           │   ├── ItemModal.js.html
│   │           │   ├── Login.js.html
│   │           │   ├── NotFound.js.html
│   │           │   └── shoppingList.js.html
│   │           ├── index.html
│   │           ├── index.js.html
│   │           ├── reducers
│   │           │   ├── cartListReducer.js.html
│   │           │   ├── cartReducer.js.html
│   │           │   ├── index.html
│   │           │   ├── index.js.html
│   │           │   ├── itemReducer.js.html
│   │           │   └── loginReducer.js.html
│   │           ├── serviceWorker.js.html
│   │           ├── setupProxy.js.html
│   │           └── store.js.html
│   ├── etc
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   └── src
│       ├── actions
│       │   ├── cartActions.js
│       │   ├── cartListActions.js
│       │   ├── itemActions.js
│       │   ├── loginAction.js
│       │   └── types.js
│       ├── App.js
│       ├── components
│       │   ├── AppContainer.js
│       │   ├── AppNavBar.js
│       │   ├── cart.js
│       │   ├── CartList.js
│       │   ├── ItemModal.js
│       │   ├── Login.js
│       │   ├── NotFound.js
│       │   └── shoppingList.js
│       ├── css
│       │   ├── all.min.css
│       │   └── App.css
│       ├── img
│       │   ├── apple-touch-icon.png
│       │   ├── favicon.png
│       │   ├── intro-bg2.jpg
│       │   └── intro-bg.jpg
│       ├── index.js
│       ├── reducers
│       │   ├── cartListReducer.js
│       │   ├── cartReducer.js
│       │   ├── index.js
│       │   ├── itemReducer.js
│       │   └── loginReducer.js
│       ├── serviceWorker.js
│       ├── setupProxy.js
│       ├── store.js
│       ├── __test__
│       │   ├── cartActions.test.js
│       │   ├── cartListActions.test.js
│       │   ├── cartListComponent.test.js.BAK
│       │   ├── cartListReducer.test.js
│       │   ├── cartReducer.test.js
│       │   ├── itemActions.test.js
│       │   ├── itemComponent.test.js
│       │   ├── itemReducer.test.js
│       │   ├── loginActions.test.js
│       │   ├── loginComponent.test.js
│       │   ├── loginReducer.test.js
│       │   ├── notFoundComponent.test.js
│       │   └── __snapshots__
│       └── webfonts
├── config
│   └── keys.js
├── coverage
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov.info
│   └── lcov-report
│       ├── api
│       │   ├── controllers
│       │   │   ├── carts.js.html
│       │   │   ├── index.html
│       │   │   ├── items.js.html
│       │   │   └── user.js.html
│       │   ├── middleware
│       │   │   ├── check-auth.js.html
│       │   │   ├── image_uploader.js.html
│       │   │   └── index.html
│       │   └── routes
│       │       ├── carts.js.html
│       │       ├── index.html
│       │       ├── items.js.html
│       │       └── user.js.html
│       ├── config
│       │   ├── index.html
│       │   └── keys.js.html
│       ├── index.html
│       └── models
│           ├── Cart.js.html
│           ├── index.html
│           ├── Item.js.html
│           └── User.js.html
├── jest.config.js
├── models
│   ├── Cart.js
│   ├── Item.js
│   └── User.js
├── package.json
├── README.md
├── server.js
├── tests
│   ├── nodeapi.test.js
│   └── testFiles
└── uploads
    └── items

```

## Maintainer

- [@NuwanTharaka](https://github.com/NuwanTharaka)
