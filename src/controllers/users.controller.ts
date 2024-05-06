const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const userService = require('../services/users.service')

router.post('/signin', async (req: { body: { name: any; password: any } }, res: { sendStatus: (arg0: number) => void; send: (arg0: { token: any }) => void }) => {
  const { name, password } = req.body
  console.log(password)
  const token = await userService.login(name, password)
  if (!token) res.sendStatus(400)
  else res.send({ token })
})

router.post('/signup', async (req: { body: { id: any; name: any; password: any; email: any; type: any } }, res: { send: (arg0: string) => void; status: (arg0: number) => void }) => {
  const { id, name, password, email, type } = req.body
  
  if (await userService.signup(req, new User(id, name, btoa(password), email, type))) res.send('your user was saved')
  res.status(409)
})
export {};

module.exports = router
