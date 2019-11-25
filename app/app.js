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

app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    store: new redisStore({
        host: config.redis.host,
        port: config.redis.port,
        db: config.redis.db,
        ttl: 3600
    }),
    secret: '1234567890abcdefghijk',
    resave: true,
    saveUninitialized: true
}));
