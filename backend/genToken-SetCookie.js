import  jwt from "jsonwebtoken";

const genTokenAndSetCookie = (userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT,{expiresIn:"10d"})

    res.cookie("jwt",token,{
        maxAge:10*24*60*60*1000,
        httOnly:true,
        
    })
}

export default genTokenAndSetCookie