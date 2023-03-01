const User = require("../models/User");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (error) {
        const errors = validationResult(req);
        console.log(errors);
        console.log(errors.array()[0].msg);
    
        for (let i = 0; i < errors.array().length; i++) {
            req.flash('error', `${errors.array()[i].msg}`);
        }
    
        res.status(400).redirect('/register')
    }
};

exports.loginUser = async (req, res) => {

    try {
        const user = await User.findOne({email:req.body.email}).exec();
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    // USER SESSION EKLENECECK
                    req.session.userID = user._id 
                    res.status(200).redirect('/dashboard')
                } else {
                    req.flash('error', `Invalid Password!`)
                    res.status(400).redirect('/login')
                }
            })
        } else {
            req.flash('error', `User Does Not Exist!`)
            res.status(400).redirect('/login')
        }
        
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};

exports.logoutUser = async (req, res) => {

    req.session.destroy(() => {
        res.redirect('/')
    })

};

exports.deleteUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        const courses = await Course.deleteMany({user:req.params.id})
        req.flash('userDeleted', `User ${user.username} deleted!`)
        res.status(201).redirect('/dashboard');
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};