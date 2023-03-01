const express = require('express')
const pageController = require('../controllers/pageContoller')
const authMiddleware = require('../middlewares/authMiddleware')
const redirectMiddleware = require('../middlewares/redirectMiddleware')

const router = express.Router()

router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/login').get(redirectMiddleware, pageController.getLoginPage)
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendEmail)
router.route('/dashboard').get(authMiddleware, pageController.getDashboardPage)


module.exports = router