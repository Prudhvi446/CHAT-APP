import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        minlength:6,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    profile:{
        type:String,
        default:""
    }
},
{
    timestamps:true
})

const User=mongoose.model("user",userSchema)

export default User