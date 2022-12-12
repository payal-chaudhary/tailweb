const jwt = require("jsonwebtoken");
const studentModel = require('../model/studentModel')


async function authentication(req,res,next) {
    try {
        const token = req.headers['x-api-key']

        const decodedToken = jwt.verify(token,"payal chaudhary",(error,done)=>{
            if(error) return res.status(500).send({ status: false, message: 'token is invalid'});
            return done
        })
        req.teacherId = decodedToken.teacherId
        next()
        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

async function authorization(req,res,next) {
    try {
        const studentId = req.params.studentId
        const teacherId = req.teacherId

        const check = await studentModel.findById(studentId)
        if(!check) return res.status(400).send({message:"student is not present"})

        if(check.teacherId!=teacherId) return res.status(400).send({message:"You have not permission to change"})
        next()

        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {authentication,authorization}