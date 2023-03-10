const express = require('express')
const categoryController = require('../controllers/categoryController')

const router = express.Router()

router.route('/').post(categoryController.createCategory)
router.route('/delete/:id').delete(categoryController.deleteCategory)
router.route('/').get(categoryController.getAllCategories)

module.exports = router