require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/Student'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/students', async (req, res) => {
        const student = new Student(req.body);
        try{
            const newStudent = await student.save();
            res.status(201).json(newStudent);
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
});

app.get('/students',async (req,res)=>{
    try{
        const students = await Student.find();
        res.json(students);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

app.get('/students/:id', async (req,res)=>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student){
            return res.status(404).json({message:'Student not found'});
        }
        res.json(student);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

app.put('/students/:id', async (req,res)=>{
    try{
        const updateStd = new Student.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updateStd){
            return res.status(404).json({message:'Student not found'});
        }
        res.json(updateStd, {success:true});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

app.delete('/students/:id', async (req,res)=>{
    try{
        const deletedStd = await Student.findByIdAndDelete(req.params.id);
        if(!deletedStd){
            return res.status(404).json({message:'Student not found'});
        }
        res.json({message:'Student deleted successfully', success:true});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});