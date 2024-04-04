const express = require('express')
const router = express.Router()
const { Product } = require('../models/Product')
const productsService = require('../services/product.service')

// get all product s of specific category by category name
router.get('/:categoryName', async (req, res) => {
  const { categoryName } = req.params
  res.send(await productsService.getByCategoryName(categoryName))
})

// get specific product by id
router.get('/:categoryName/:productId', async (req, res) => {
  const { categoryName, productId } = req.params
  res.send(await productsService.getById(categoryName, productId))
})

// add new product to specific category by category name
router.post('/:categoryName', (req, res) => {
  const { categoryName } = req.params
  const { id, name, price } = req.body
  productsService.addProduct(categoryName, new Product(id, name, price))
  res.send('the product was added successfully')
})

// update specific product properties
router.put('/:categoryName/:productId', async (req, res) => {
  const { categoryName, productId } = req.params
  const { id, name, price } = req.body
  productsService.updateProduct(categoryName, productId, new Product(id, name, price))
  res.send('the product was updated successfully')
})

// delete specific product
router.delete('/:categoryName/:productId', (req, res) => {
  const { categoryName, productId } = req.params
  productsService.deleteProduct(categoryName, productId)
  res.send('the product was deleted successfully')
})

module.exports = router
