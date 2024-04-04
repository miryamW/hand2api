const express = require('express')
const categoryService = require('../services/caregories.service')
const userService = require('../services/users.service')
const router = express.Router()

router.get('/', async (req, res) => {
  res.send(await categoryService.getAllCategories())
})

router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params
  res.send(await categoryService.getCategoryById(categoryId))
})

// add new category - only for manager
router.post('/', async (req, res) => {
  if (await userService.isManager(req) === false) res.sendStatus(401)
  else {
    const { categoryName } = req.body
    await categoryService.addCategory(categoryName)
    res.send('the category was added successfully')
  }
})

// update specific cateory properties - only for manager
router.put('/:categoryId', async (req, res) => {
  if (await userService.isManager(req) === false) res.sendStatus(401)
  const { categoryId } = req.params
  const { categoryName } = req.body
  await categoryService.updateCategory(categoryId, categoryName)
  res.send('the category was updated successfully')
})

// delete specific category - only for manager
router.delete('/:categoryId', async (req, res) => {
  if (await userService.isManager(req) === false) res.sendStatus(401)
  else {
    const { categoryId } = req.params
    categoryService.deleteCategory(categoryId)
    res.send('the category was deleted successfully')
  }
})

module.exports = router
