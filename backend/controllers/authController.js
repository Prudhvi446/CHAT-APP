import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import genTokenAndSetCookie from "../genToken-SetCookie.js"



export const signup =async  (req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body
        if(password!==confirmPassword){
            return res.status(400).json({error:"Password doesn't match"})
        }

        const user=await User.findOne({username})
        if(user){
            return res.status(400).json({error:"User already exist"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(password,salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser=new User({
            fullName,
            username,
            password:hashedPass,
            gender,
            profile:gender=="male"?boyProfilePic:girlProfilePic
        })

        if(newUser){
            genTokenAndSetCookie(newUser._id,res)

            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
            fullname:newUser.fullName,
            })

        }
        else{
            res.status(400).json({error:"Invalid user data"})
        }

    } catch (error) {

        console.log("Error in signup",error.message)
        res.status(500).json({error:"Internal Server error"})
        
        
    }
}

export const login= async (req,res)=>{
    try {
        const {username,password}=req.body
        const user=await User.findOne({username})
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid credentials"})
        }

        genTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profile:user.profile
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout=(req,res)=>{
    try {
        res.cookie("jwt",{maxAge:0})
        res.status(200).json({message:"Loggedout successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}