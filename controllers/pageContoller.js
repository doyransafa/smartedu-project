const User = require('../models/User')
const Category = require('../models/Category')
const Course = require('../models/Course')

exports.getIndexPage = (req,res) => {
    console.log(req.session.userID)
    res.status(200).render('index', {
        page_name: 'index',
    })
}

exports.getAboutPage = (req,res) => {
    res.status(200).render('about', {
        page_name: 'about'
    })
}

exports.getLoginPage = (req,res) => {
    res.status(200).render('login', {
        page_name: 'login'
    })
}

exports.getRegisterPage = (req,res) => {
    res.status(200).render('register', {
        page_name: 'register'
    })
}

exports.getDashboardPage = async (req,res) => {
    const user = await User.findById(req.session.userID).populate('courses')
    const categories = await Category.find()
    const courses = await Course.find({user:req.session.userID})
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses
    })
}

exports.getContactPage = (req,res) => {
    res.status(200).render('contact', {
        page_name: 'contact'
    })
}