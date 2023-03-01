const Category = require("../models/Category");
const mongoose = require("mongoose");

exports.createCategory = async (req, res) => {
    
    try {
        const category = await Category.create(req.body);
        req.flash('categoryAdded', `${category.name} added!`)
        res.status(201).redirect('/dashboard');
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};
exports.deleteCategory = async (req, res) => {
    
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        req.flash('categoryDeleted', `${category.name} deleted!`)
        res.status(201).redirect('/dashboard');
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};

exports.getAllCategories = async (req, res) => {
    
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};