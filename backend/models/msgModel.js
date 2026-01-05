import mongoose, { mongo } from "mongoose";

const msgSchems=new mongoose.Schema(

    {
        senderid:{
            tyoe:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        receuverid:{
            tyoe:mongoose.Schema.Types.ObjectId,
            ref:"user",
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