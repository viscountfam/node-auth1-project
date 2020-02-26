const express = require('express');
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const KnexStore = require('connect-session-knex')(session)
const usersRouter = require('./users/users-router.js')
const restricted = require('./restricted-middleware.js')
const knex = require('./data/dbconfig.js')
const server = express();

const sessionConfig = {
    name: 'sugar',
    secret: 'Sugar cookies are good cookies',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 3600,
        secure: false,
        httpOnly: true,
    },

    store: new KnexStore ({
        knex,
        tablename: 'session',
        createtable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 3600
    })
}


server.use(helmet());
server.use(express.json());
server.use(cors())
server.use(session(sessionConfig))
server.use('/api/', usersRouter);

server.get('/', (req, res) => {
    console.log(req.session)
    res.json({api: "up"})
})

module.exports = server;