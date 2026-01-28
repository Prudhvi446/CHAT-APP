import msg from "../models/msgModel.js";
import convos from "../models/convosModel.js";
import { getReceiverSocketId,  io } from "../socket.js";
export const sendMsg=async (req,res)=>{
    try {
        const {message}=req.body
        const {id:receiverId}=req.params
        const senderId=req.user._id

        let conversation=await convos.findOne({
            participents:{$all :[senderId,receiverId]}
        })

        if(!conversation){
            conversation=await convos.create({
                participents:[senderId,receiverId]
            })
        }

        const newMsg = new msg({
            senderid: senderId,
            receuverid: receiverId,
            message
        })

        if(newMsg){
            conversation.messages.push(newMsg._id)
        }

        await Promise.all([conversation.save(), newMsg.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMsg)
        }

        res.status(201).json(newMsg)

        


    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

export const getMsg= async (req,res)=>{
    try {
        const {id:usetoChatId}=req.params
        const senderId=req.user._id

        const conversation=await convos.findOne({
            participents:{$all:[senderId,usetoChatId]}
        }).populate("messages")

        if(!conversation){
            return res.status(200).json([])
        }

        const messages=conversation.messages

        res.status(200).json(messages)
    } catch (error) {

        console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
        
    }
}
