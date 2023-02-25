const Course = require("../models/Course");
const Category = require("../models/Category");
const mongoose = require("mongoose");

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).redirect(`/courses/${course.slug}`);
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error,
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.category;
        const selectedCategory = await Category.findOne({ slug: categorySlug });
        let filter = {};
        if (categorySlug) {
            filter = { category: selectedCategory._id };
        }
        const courses = await Course.find(filter).sort({ createdAt: -1 });
        const categories = await Category.find().sort({ name: 1 });
        res.status(200).render("courses", {
            page_name: "courses",
            courses,
            categories,
            selectedCategory
        });
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error,
        });
    }
};

exports.getSingleCourse = async (req, res) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        res.status(200).render("course-single", {
            page_name: "courses",
            course,
            options,
        });
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error,
        });
    }
};
