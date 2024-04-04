const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Number,
  name: String,
  password: String,
  email: String,
  type: String
})

const UserModel = mongoose.model('users', userSchema)
module.exports = { UserModel }
