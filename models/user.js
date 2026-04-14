const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Userschema=new Schema({
    firstName:{
        type:String,
         minLength: [3, "First name must be at least 3 characters long"],
         maxLength: [20, "First name cannot exceed 20 characters"],
        trim:true,
        required:true,
    },
    lastname:{
        type:String,
        trim:true,
    },
    emailId:{
        type:String,
        lowercase:true,
        trim:true,
         required:true,
         immutable:true,
    },
    password:{
        type:String,
        minLength:[6, "password at least 6 characters long"],
        required:true,
    },
    age:{
        type:Number,
        min:[14, "age  should be greate than 14"],
        max:[50,"age connot be greate than 50"],
    },
    city:{
        type:String,
    },
    gender: {
    type: String,
    enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male, female, or other"
        }
    },
},{ timestamps: true })

const User = mongoose.model('user',Userschema);
module.exports=User;