const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  category_id: Number,
  category_name: String,
  products: [{
    id: Number,
    name: String,
    price: Number
  }]
})

const ProductModel = mongoose.model('products', categorySchema)
module.exports = ProductModel
