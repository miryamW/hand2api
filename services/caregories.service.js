const { Category } = require('../models/Category')
const { ProductModel } = require('../dataAccess/ProductModel')

const getAllCategories = async () => {
  const categories = await ProductModel.find({}).select({ _id: 0, category_name: 1 }).exec()
  return categories.map(c => c.category_name).toSorted()
}

const addCategory = async (categoryName) => {
  const newCategory = new Category(0, categoryName)
  await setId(newCategory)
  const category = new ProductModel({
    category_id: parseInt(newCategory.category_id),
    category_name: newCategory.category_name,
    products: newCategory.products
  })
  await category.save()
}

const getCategoryById = async (id) => {
  return await ProductModel.findOne({ category_id: id }).select({ _id: 0, __v: 0 }).exec()
}

const updateCategory = async (categoryId, categoryName) => {
  const newCategory = new Category(categoryId, categoryName)
  await ProductModel.updateOne({ category_id: categoryId }, { category_name: newCategory.category_name, products: newCategory.products })
}

const deleteCategory = async (categoryId) => {
  const product = await ProductModel.findOne({ category_id: parseInt(categoryId) }).exec()
  await product.deleteOne()
}

const setId = async (category) => {
  const productsList = await ProductModel.find({})
  const categoryIds = productsList.map(p => parseInt(p.category_id))
  category.category_id = Math.max.apply(this, categoryIds) + 1
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
}
