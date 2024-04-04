const { Product } = require('../models/Product')
const { ProductModel } = require('../dataAccess/ProductModel')

const getByCategoryName = async (categoryName) => {
  const products = await ProductModel.findOne({ category_name: categoryName }).select({ _id: 0, products: 1 }).exec()
  return products.products.map(p => new Product(p.id, p.name, p.price)).toSorted((p1, p2) => {
    if (p1.name < p2.name) {
      return -1
    }
    if (p1.name > p2.name) {
      return 1
    }
    return 0
  })
}

const getById = async (categoryName, productId) => {
  const products = await ProductModel.findOne({ category_name: categoryName }).select({ _id: 0, products: 1 }).exec()
  const thisProduct = products.products.find(p => p.id === productId)
  if (!thisProduct) return 'not exist'
  return new Product(thisProduct.id, thisProduct.name, thisProduct.price)
}

const addProduct = async (categoryName, newProdct) => {
  const products = await ProductModel.findOne({ category_name: categoryName }).select({ _id: 0, products: 1 }).exec()
  products.products.push(newProdct)
  await ProductModel.updateOne({ category_name: categoryName }, { products: products.products })
}

const updateProduct = async (categoryName, productId, product) => {
  const products = await ProductModel.findOne({ category_name: categoryName }).select({ _id: 0, products: 1 }).exec()
  const index = products.products.findIndex(p => p.id === productId)
  products.products[index] = product
  await ProductModel.updateOne({ category_name: categoryName }, { products: products.products })
}

const deleteProduct = async (categoryName, productId) => {
  const products = await ProductModel.findOne({ category_name: categoryName }).select({ _id: 0, products: 1 }).exec()
  const newProductsArr = products.products.filter(p => p.id !== productId)
  await ProductModel.updateOne({ category_name: categoryName }, { products: newProductsArr })
}

module.exports = {
  getByCategoryName,
  getById,
  addProduct,
  updateProduct,
  deleteProduct
}
