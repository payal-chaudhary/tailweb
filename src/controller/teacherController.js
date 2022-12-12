const teacherModel = require("../model/teacherModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { default: mongoose } = require("mongoose")

const registerTeacher= async(req,res)=>{
    try{
let {name, email,password}= req.body
if(!name) return res.status(400).send({status:false, message:"Please provide name"})
if(!email) return res.status(400).send({status:false, message:"Please provide Email"})
let checkEmail = await teacherModel.findOne({email})
if(checkEmail) return res.status(400).send({status:false, message:"Email already in use"})
if(!password) return res.status(400).send({status:false, message:"Create password is must"})

req.body.password = await bcrypt.hash(password,12)
 let teacherData = await teacherModel.create(req.body)
  res.status(201).send({
    status:true,
    message:"teacher registered successfully",
    data:teacherData
  })


    }
    catch(error){
        res.status(500).send({
            status:false,
            message: error.message
        })

    }
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .send({ status: false, message: 'Please Provide Credentials' });
  
      const checkCredentials = await teacherModel.findOne({ email });
      if (!checkCredentials)
        return res
          .status(400)
          .send({ status: false, message: 'Credentials are Incorrect' });
           const verifyPassword = await bcrypt.compare(
            password,
            checkCredentials.password
           );
           if(!verifyPassword){
            return res.status(400).send({status:false, message:"password is incorrect"})
           }
  
      const token = jwt.sign(
        { teacherId: checkCredentials['_id'] },
        'payal chaudhary'
      );
      return res.status(200).send({ status: true, message: token });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

  module.exports = {registerTeacher,login}