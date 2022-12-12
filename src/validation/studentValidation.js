const v = require("./validation")
const studentModel = require("../model/studentModel")



module.exports = {
    registerStudent: (req, res, next) => {
        try {
            let { name} = req.body
            if (!v.validBody(req.body))
                return res.status(400).send({ status: false, message: "Please Provide Some Data!" })
            if (!v.name(name))
                return res.status(400).send({ status: false, msg: "fname can be in Alphabets Only and without Spacing!" })
            
            next()
        } catch (e) {
            res.status(500).send({ status: false, msg: e.message })
        }
    },

    

    updateStudents: async (req, res, next) => {
        try {
            

            let { name } = req.body
            if (!v.validBody(req.body))
                return res.status(400).send({ status: false, msg: "Provide some Data to be Updated!" })
            if (!v.name(name))
                return res.status(400).send({ status: false, message: "Please enter a valid fName!" })
           
            
           next()
        } catch (e) {
            res.status(500).send({ status: false, msg: e.message })
        }
    }
}