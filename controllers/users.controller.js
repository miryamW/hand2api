const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const userService = require('../services/users.service')

router.post('/login', async (req, res) => {
  const { name, password } = req.body
  console.log(password)
  const token = await userService.login(name, password)
  if (!token) res.sendStatus(400)
  else res.send({ token })
})

router.post('/signup', async (req, res) => {
  const { id, name, password, email, type } = req.body
  if (await userService.signup(req, new User(id, name, btoa(password), email, type))) res.send('your user was saved')
  res.status(409)
})

module.exports = router
