const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createCourse = async (req, res) => {
    
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: "success",
            course
        });
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};

exports.getAllCourses = async (req, res) => {
    
    try {
        const courses = await Course.find().sort({createdAt:-1});
        res.status(200).render('courses', {
            page_name: 'courses',
            courses
        });
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};

exports.getSingleCourse = async (req, res) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    try {
        const course = await Course.findOne({slug:req.params.slug});
        res.status(200).render('course-single', {
            page_name: 'courses',
            course,
            options
        });
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error
        });
    }
};

