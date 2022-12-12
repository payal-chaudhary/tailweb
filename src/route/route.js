const express = require("express")
const router = express.Router()



const { authentication, authorization } = require('../middleware/auth');
const { registerStudent, deleteStudents, updateStudents } = require('../controller/studentController');
const validStudent = require('../validation/studentValidation')
const validTeacher = require('../validation/teacherValidation')

const { registerTeacher, login } = require('../controller/teacherController');

router.post('/teacher', validTeacher.registerTeacher, registerTeacher);
router.get('/teacher/login', validTeacher.loginTeacher, login);

router.post('/students/register',authentication,validStudent.registerStudent, registerStudent)
router.put('/student/:studentId',authentication,authorization,validStudent.updateStudents, updateStudents)
router.delete('/student/:studentId',authentication,authorization,deleteStudents)
module.exports = router;