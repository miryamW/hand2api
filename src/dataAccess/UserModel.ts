const mongoose:any = require('mongoose')

const Schma:any = mongoose.Schema

const userSchema = new Schma({
  id: Number,
  name: String,
  password: String,
  email: String,
  type: String
})

const UserModel = mongoose.model('users', userSchema)
export {};

module.exports = { UserModel }
