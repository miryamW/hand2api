const express = require('express')

const app = express()
require('dotenv').config()

const { PORT } = process.env
const bodyParser = require('body-parser')
const cors = require('cors')
const categories = require('../controllers/categories.controller')
const products = require('../controllers/products.controller')
const users = require('../controllers/users.controller')
const errors = require('../controllers/errors.controller')
const logger = require('../middlewares/log.middleware')
const isBodyExist = require('../middlewares/isBodyExist.middleware')
const auth = require('../middlewares/auth.middleware')
const main = require('./db')

main().catch((err) => console.log(err))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(logger)
app.use(isBodyExist)
app.use(users)
app.use(auth)
app.use('/categories', categories)
app.use('/products', products)
app.use(errors)

app.listen(PORT, (error) => {
  if (!error) console.log(`Server is Successfully Running, and App is listening on port ${PORT}`)
  else console.log("Error occurred, server can't start", error)
})
