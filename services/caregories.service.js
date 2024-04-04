const { Category } = require('../models/Category')
const { ProductModel } = require('../dataAccess/ProductModel')

const getAllCategories = async () => {
  const categories = await ProductModel.find({}).select({ _id: 0, categoryName: 1 }).exec()
  return categories.map(c => c.categoryName).toSorted()
}

const addCategory = async (categoryName) => {
  const newCategory = new Category(0, categoryName)
  await setId(newCategory)
  const category = new ProductModel({
    categoryId: parseInt(newCategory.categoryId),
    categoryName: newCategory.categoryName,
    products: newCategory.products
  })
  await category.save()
}

const getCategoryById = async (id) => {
  return await ProductModel.findOne({ categoryId: id }).select({ _id: 0, __v: 0 }).exec()
}

const updateCategory = async (categoryId, categoryName) => {
  const newCategory = new Category(categoryId, categoryName)
  await ProductModel.updateOne({ categoryId }, { categoryName: newCategory.categoryName, products: newCategory.products })
}

const deleteCategory = async (categoryId) => {
  const product = await ProductModel.findOne({ categoryId: parseInt(categoryId) }).exec()
  await product.deleteOne()
}

const setId = async (category) => {
  const productsList = await ProductModel.find({})
  const categoryIds = productsList.map(p => parseInt(p.categoryId))
  category.categoryId = Math.max.apply(this, categoryIds) + 1
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
}
