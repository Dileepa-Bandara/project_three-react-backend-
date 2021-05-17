//import mongoose module
const mongoose = require("mongoose");

//get mongoose Schema class methods to variable
const Schema = mongoose.Schema;

//create object using schema methods
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

//create document/table name with student and pass this schema to it
const Student = mongoose.model("Student", studentSchema);

//export Student
module.exports = Student;
