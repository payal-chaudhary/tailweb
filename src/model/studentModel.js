const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
     teacherId :{
        type:ObjectId,
        ref: 'teacher',
        required: true
     },
     name:{
        type: String,
        required: true

     },
     subject:{
        type: String,
        enum :["Hindi", "English","Maths","Science"],
        required: true
     },
     marks:{
        type:Number,
        required:true
     },
     isDeleted: {
      type: Boolean,
      default: false
  }
     

},{timestamps:true})

module.exports = mongoose.model("student",studentSchema )