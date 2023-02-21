const express = require('express')
const courseController = require('../controllers/courseController')

const router = express.Router()

router.route('/').post(courseController.createCourse)
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getSingleCourse)

module.exports = router