import  jwt from "jsonwebtoken";

const genTokenAndSetCookie = (userid,res)=>{
    const token=jwt.sign({userId: userid},process.env.JWT,{expiresIn:"10d"})

    res.cookie("jwt",token,{
        maxAge:10*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default genTokenAndSetCookie