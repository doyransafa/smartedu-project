const User = require('../models/User')
const Category = require('../models/Category')
const Course = require('../models/Course')
const nodemailer = require('nodemailer')

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
    const users = await User.find()
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses,
        users
    })
}

exports.getContactPage = (req,res) => {
    res.status(200).render('contact', {
        page_name: 'contact'
    })
}

exports.sendEmail = async (req,res) => {

    try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'tate.grimes@ethereal.email',
            pass: 'hskr9XAKndnxdybXry'
        }
    });
    
      // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"Smart Edu 👻" <tate.grimes@ethereal.email>', // sender address
        to: 'doyransafa@gmail.com', // list of receivers
        subject: "Smart Edu Subject ✔", // Subject line
        html: `<b>Message from ${req.body.name} </b>`, // html body
    });
    
    console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'Message sent succesfully')

    } catch (error) {       
    req.flash('error', `Oops! Something went wrong! Details:${error}`)
    }
    res.status(200).redirect('/contact')
}