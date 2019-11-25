const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    session = require('express-session'),
    redisStore = require('connect-redis')(session),
    env = process.env.NODE_ENV,
    config = require('./config/index')(),
    pugFunctions = require('./helpers/pug_functions'),
    path = require('path');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
