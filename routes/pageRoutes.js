const express = require('express')
const pageController = require('../controllers/pageContoller')

const router = express.Router()

router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/login').get(pageController.getLoginPage)
router.route('/register').get(pageController.getRegisterPage)
router.route('/contact').get(pageController.getContactPage)


module.exports = router