require('dotenv').config()
const express = require('express')
const massive = require('massive')
const ctrl = require('./products_controller')

const app = express()

const {SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())

app.post('/api/products', ctrl.create)
app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.delete('/api/products/:id', ctrl.delete)

massive(CONNECTION_STRING)
    .then(dbInstance => {
    app.set('db', dbInstance)
})
    .catch(err => console.log(err))

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} puppies on parade`)
})