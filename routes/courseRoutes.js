const express = require('express')
const courseController = require('../controllers/courseController')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router()

router.route('/').post(roleMiddleware(['teacher', 'admin']), courseController.createCourse)
router.route('/enroll').post(courseController.enrollCourse)
router.route('/drop').post(courseController.dropCourse)
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getSingleCourse)
router.route('/:id/delete').delete(courseController.deleteCourse)
router.route('/update/:id').put(courseController.updateCourse)

module.exports = router