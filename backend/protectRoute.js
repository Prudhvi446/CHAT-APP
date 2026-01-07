import jwt from "jsonwebtoken"
import User from "./models/userModel"

const protectRoute=async (req,res,next)=>{
    try {
        const token = req.cookie.jwt

        if(!token){
            return res.status(401).json({error:"Unauthorised"})
        }

        const decoded= jwt.verify(token,process.env.JWT)

        if(!decoded){
            return res.status(401).json({error:"Unauthorised"})
        }

        const user= await User.findOne(decoded.userId).select("-password")

        if(!user){
            return res.status(401).json({error:"User Not Found"})

        }

        req.user=user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }

}

export default protectRoute