const { Product } = require('../models/Product')
const { ProductModel } = require('../dataAccess/ProductModel')

const getByCategoryName = async (categoryName) => {
  const category = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  return category.products.map(p => new Product(p.id, p.name, p.price)).toSorted((p1, p2) => {
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
  const products = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  const thisProduct = products.products.find(p => p.id === parseInt(productId))
  if (!thisProduct) return 'not exist'
  return new Product(thisProduct.id, thisProduct.name, thisProduct.price)
}

const addProduct = async (categoryName, newProdct) => {
  const category = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  category.products.push(newProdct)
  await ProductModel.updateOne({ categoryName }, { products: category.products })
}

const updateProduct = async (categoryName, productId, product) => {
  const category = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  const index = category.products.findIndex(p => p.id === parseInt(productId))
  category.products[index] = product
  console.log(category)
  await ProductModel.updateOne({ categoryName }, { products: category.products })
}

const deleteProduct = async (categoryName, productId) => {
  const products = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
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
