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

//session middleware with redis
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

//set the config, helper and env variables
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    if(req.session.user){
        res.locals.user = req.session.user;
    }
    res.locals.config = config;
    res.locals.pugFunctions = pugFunctions;
    res.locals.env = env;
    next();
});

const routes = require('./routes/index');
app.use('/', routes);
