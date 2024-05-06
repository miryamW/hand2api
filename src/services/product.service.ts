const { Product } = require('../models/Product')
const { ProductModel } = require('../dataAccess/ProductModel')

const getByCategoryName = async (categoryName: any) => {
  const category = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  return category.products.map((p:Product) => new Product(p.id, p.name, p.price)).toSorted((p1: Product, p2: Product) => {
    if (p1.name < p2.name) {
      return -1
    }
    if (p1.name > p2.name) {
      return 1
    }
    return 0
  })
}

const getById = async (categoryName: string, productId: any) => {
  const products = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  const thisProduct = products.products.find((p:Product) => p.id === parseInt(productId))
  if (!thisProduct) return 'not exist'
  return new Product(thisProduct.id, thisProduct.name, thisProduct.price)
}

const addProduct = async (categoryName:string, newProduct: Product) => {
  const category = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  category.products.push(newProduct)
  await ProductModel.updateOne({ categoryName }, { products: category.products })
}

const updateProduct = async (categoryName:string, productId:any, product:Product) => {
  const category = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  const index = category.products.findIndex((p:Product) => p.id === parseInt(productId))
  category.products[index] = product
  await ProductModel.updateOne({ categoryName }, { products: category.products })
}

const deleteProduct = async (categoryName:string, productId:any) => {
  const products = await ProductModel.findOne({ categoryName }).select({ _id: 0, products: 1 }).exec()
  const newProductsArr = products.products.filter((p:Product) => p.id !== parseInt(productId))
  console.log(newProductsArr);
  
  await ProductModel.updateOne({ categoryName }, { products: newProductsArr })
}
export {};

module.exports = {
  getByCategoryName,
  getById,
  addProduct,
  updateProduct,
  deleteProduct
}
