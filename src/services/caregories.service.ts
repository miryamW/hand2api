const{ Category }= require('../models/Category')
const { ProductModel } = require('../dataAccess/ProductModel')

const getAllCategories = async () => {
  const categories = await ProductModel.find({}).select({ _id: 0, categoryName: 1 }).exec()
  return categories.map((c:any) => c.categoryName).toSorted()
}

const addCategory = async (categoryName:string) => {
  const newCategory = new Category(0, categoryName)
  await setId(newCategory)
  console.log(newCategory.categoryId);
  
  const category = new ProductModel({
    categoryId: newCategory.categoryId,
    categoryName: newCategory.categoryName,
    products: newCategory.products
  })
  await category.save()
}

const getCategoryById = async (id:number) => {
  return await ProductModel.findOne({ categoryId: id }).select({ _id: 0, __v: 0 }).exec()
}

const updateCategory = async (categoryId:any, categoryName:string) => {
  const newCategory = new Category(categoryId, categoryName)
  await ProductModel.updateOne({ categoryId }, { categoryName: newCategory.categoryName, products: newCategory.products })
}

const deleteCategory = async (categoryId:any) => {
  const category = await ProductModel.findOne({ categoryId: parseInt(categoryId) }).exec()
  await category.deleteOne()
}

const setId = async (category:any) => {
  const productsList = await ProductModel.find({})
  const categoryIds = productsList.map((c:any) => c.categoryId)
  category.categoryId = Math.max.apply(this,categoryIds) + 1
}
export {};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
}
