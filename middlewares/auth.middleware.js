const jwt = require('jsonwebtoken')
require('dotenv').config()
const userService = require('../services/users.service')

const auth = (req, res, next) => {
  let token = req.header('Authorization')
  if (!token) return res.status(401).send('Access Denied')
  try {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    const type = userService.findUserType(verified.id, verified.userName)
    if (!type) res.sendStatus(403)
    next()
  } catch (err) {
    res.sendStatus(403)
  }
}

module.exports = auth
