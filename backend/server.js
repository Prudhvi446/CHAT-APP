import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./db.js"
import cookieParser from "cookie-parser"
import { app,server } from "./socket.js"
import authRoutes from "./routes/authRoutes.js"
import msgRoutes from "./routes/msgRoutes.js"
import userRoutes from "./routes/userRoutes.js"


dotenv.config()


app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRoutes)
app.use("/api/messages",msgRoutes)
app.use("/api/users",userRoutes)




app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("Server is running");
    
})