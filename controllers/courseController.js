const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID,
        });
        const user = await User.findById(req.session.userID);
        await user.courses.addToSet({ _id: course._id });
        await user.save();
        req.flash('success', `Course ${req.body.name} created succesfully`)
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
        const query = req.query.search

        const selectedCategory = await Category.findOne({ slug: categorySlug });
        const loggedUser = await User.findById(req.session.userID);
        let filter = {};
          
        if (categorySlug) {
            filter = { category: selectedCategory._id };
        }
        if (query) {
            filter = {name: query}
        }
        if (!query && !categorySlug) {
            filter.name = ''
            filter.category = null
        }
        const courses = await Course.find({
            $or: [
                {name:{$regex: '.*' + filter.name + '.*', $options: 'i'}},
                {category: filter.category}
            ]
        }).sort({ createdAt: -1 }).populate('user');
        const categories = await Category.find().sort({ name: 1 });
        
        

        res.status(200).render("courses", {
            page_name: "courses",
            courses,
            categories,
            selectedCategory,
            loggedUser,
            query
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
        const course = await Course.findOne({ slug: req.params.slug }).populate("user");
        const user = await User.findById(req.session.userID);
        res.status(200).render("course-single", {
            page_name: "courses",
            course,
            options,
            user
        });
    } catch (error) {
        res.status(400).json({
            status: "bad request",
            error,
        });
    }
};

exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.addToSet({ _id: req.body.course_id });
        await user.save();
        req.flash('info', `Enrolled to course succesfully`)
        res.status(200).redirect("/dashboard");
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.dropCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.pull({ _id: req.body.course_id });
        await user.save();

        res.status(200).redirect("/dashboard");
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};