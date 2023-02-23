const User = require("../models/User");
const mongoose = require("mongoose");

exports.createUser = async (req, res) => {
    
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: "success",
            user
        });
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};