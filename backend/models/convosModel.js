import mongoose from "mongoose";

const convoSchema=new mongoose.Schema({
    participents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"msg",
        default:[],
    }],

},

{
    timestamps:true,
})

const convos=mongoose.model("convos",convoSchema)

export default convos