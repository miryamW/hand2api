const { UserModel } = require('../dataAccess/UserModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (name: any, password: string) => {
  const encodedPassword = btoa(password)
  const currentUser = await UserModel.findOne({ name, password: encodedPassword }).select({ _id: 0 }).exec()
  if (currentUser == null) return null
  return jwt.sign({ id: currentUser.id, userName: currentUser.name }, process.env.SECRET_KEY)
}

const signup = async (req: any, user: { name: any; password: any; type: string; id: string; email: any }) => {
  const similarUser = await UserModel.findOne({ name: user.name, password: user.password }).select({ _id: 0 }).exec()
  if (similarUser != null) return false
  if (await isManager(req) === false)user.type = 'User'
  const newUser = new UserModel({
    id: parseInt(user.id),
    name: user.name,
    password: user.password,
    email: user.email,
    type: user.type
  })
  await newUser.save()
  return true
}

const isManager = async (req: { header: (arg0: string) => any }) => {
  let token = req.header('Authorization')
  if (!token) return false
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft()
  }
  const verified = jwt.verify(token, process.env.SECRET_KEY)
  const type = await findUserType(verified.id, verified.userName)
  if (type !== 'Manager') return false
  else return true
}

const findUserType = async (id: any, name: any) => {
  const user = await UserModel.findOne({ id, name }).select({ _id: 0 }).exec()
  return user.type
}
export {};

module.exports = {
  login,
  signup,
  isManager,
  findUserType
}
