const express = require('express')
const router = express.Router()
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const con = require('./server/config/db')

const app = express()

require('./server/config/db')
require('./server/config/passport')

app.use(express.static(__dirname + '/public'))

const PORT = 8000

app.set('view engine', 'ejs')

app.use(express.urlencoded())
app.use(express.json())

const sessionStore = new MySQLStore({
    expiration: 86400000, 
    createDatabaseTable: true, 
    schema: {
      tableName: 'sessions', 
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  }, con);
app.use(session({
    secret: 'keyboard', // Secret key for session encryption, choose your own
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // Use the MySQL session store
  }));
  
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./server/pages/router'))
app.use(require('./server/auth/router'))
app.use(require('./server/films/router'))


app.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
})



