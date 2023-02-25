const User = require('../models/User')

module.exports = async (req, res, next) => {
        if (!userIN) {
        return res.redirect('/login')
    }
    next()
}