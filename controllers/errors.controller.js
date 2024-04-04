const express = require('express')

const router = express.Router()

router.get('*', (req, res, next) => {
  const err = new Error('You have a mistake at the url')
  err.statusCode = 404
  next(err)
})

router.use((err, req, res, next) => {
  console.log(`error ${err.message} ${err.statusCode}`)
  if (res.headersSent) {
    return next(err)
  }
  const status = err.statusCode || 500
  const message = err.message || 'there is now error in the server. try again later'
  res.status(status).send(message)
})

module.exports = router
