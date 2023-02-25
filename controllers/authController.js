const User = require("../models/User");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
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
                    res.send('Login is NOT succesful')
                }
            })
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