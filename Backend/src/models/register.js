const mongoose = require("mongoose");
const {Schema} = mongoose

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique : true,  
    },
    gender: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    }
})


const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;