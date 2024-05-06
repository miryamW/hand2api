const jwt = require('jsonwebtoken')
require('dotenv').config()
const userService = require('../services/users.service')

const auth = (req: { header: (arg0: string) => any }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any } }; sendStatus: (arg0: number) => void }, next: () => void) => {
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
