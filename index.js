const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash');
const methodOverride = require('method-override')

const pageRoutes = require('./routes/pageRoutes')
const courseRoutes = require('./routes/courseRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db')
  .then(() => console.log('Connected to database!'));

app.set('view engine', 'ejs')

global.userIN = null

app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db' })
}))
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});


app.use('*', async (req, res, next) => {
  userIN = req.session.userID
  next()
})
app.use('/', pageRoutes)
app.use('/courses', courseRoutes)
app.use('/categories', categoryRoutes)
app.use('/users', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`${PORT} uzerinden sunucuya baglanildi`)
})

