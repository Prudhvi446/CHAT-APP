import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {connectDB} from "./db.js"

dotenv.config()
const app=express()
app.use(cors())




app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("Server is running");
    
})