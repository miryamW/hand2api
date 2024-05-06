const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryId: Number,
  categoryName: String,
  products: [{
    id: Number,
    name: String,
    price: Number
  }]
})

const ProductModel = mongoose.model('products', categorySchema)
module.exports = { ProductModel }
