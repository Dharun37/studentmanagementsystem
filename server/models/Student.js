const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    rollno: String,
    department: String,
    email: String
},{timestamps:true});

module.exports = mongoose.model('Student', studentSchema);