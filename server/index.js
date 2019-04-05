require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const ac = require('./controllers/authController')
const tc = require('./controllers/treasureController')

const app = express()

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected')
    console.log(db.listTables())
})

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

// authorization
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)

//treasure
app.get('/api/treasure/dragon', tc.dragonTreasure)



app.listen(SERVER_PORT, console.log(`blowing stuff up on port ${SERVER_PORT}`))