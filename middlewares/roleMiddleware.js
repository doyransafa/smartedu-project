module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role
        if(roles.includes(userRole)) {
            next()
        } else {return res.status(401).send(`You Do No Have Permission. Your Role is ${userRole}`)}
    }
}