import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./db.js"
import cookieParser from "cookie-parser"
import { app,server } from "./socket.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()


app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRoutes)




app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("Server is running");
    
})