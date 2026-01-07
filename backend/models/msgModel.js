import mongoose, { mongo } from "mongoose";

const msgSchema=new mongoose.Schema(

    {
        senderid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        receuverid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        message:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true
    },
    
)

const msg=mongoose.model("msg",msgSchema)

export default msg