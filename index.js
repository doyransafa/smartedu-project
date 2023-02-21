const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const pageRoute = require('./routes/pageRoutes')
const courseRoute = require('./routes/courseRoutes')

const app = express()


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('Connected to database!'));

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/', pageRoute)
app.use('/courses', courseRoute)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`${PORT} uzerinden sunucuya baglanildi`)
})

