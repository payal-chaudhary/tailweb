const v = require('./validation')
const teacherModel = require('../model/teacherModel')

module.exports = {
    registerTeacher: (req, res, next) => {
        try {
            let { password, name, email } = req.body
            if (!v.validBody(req.body))
                return res.status(400).send({ status: false, message: "Please Provide Some Data!" })
            
            if (!v.name(name))
                return res.status(400).send({ status: false, msg: "fname can be in Alphabets Only and without Spacing!" })
            if (!v.emailRegex(email))
                return res.status(400).send({ status: false, msg: "Not a Valid E-mail!" })
            if (!v.isValidPassword(password))
                return res.status(400).send({ status: false, msg: "Length of the Password can be 8 to 15 !" })
           
            next()
        } catch (e) {
            res.status(500).send({ status: false, msg: e.message })
        }
    },

    loginTeacher: (req, res, next) => {
        try {
            let { email, password } = req.body
            if (!v.validBody(req.body))
                return res.status(400).send({ status: false, message: "Please Provide Some Data!" })
            if (!v.emailRegex(email))
                return res.status(400).send({ status: false, message: "Please Provide a valid E-mail!" })
            if (!v.isValidPassword(password))
                return res.status(400).send({ status: false, message: " Please Provide a valid Password!" })
            next()
        } catch (e) {
            res.status(500).send({ status: false, msg: e.message })
        }
    }

   
}