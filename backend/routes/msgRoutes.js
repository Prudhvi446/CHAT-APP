import express from "express";
import protectRoute from "../protectRoute.js"
import { getMsg,sendMsg } from "../controllers/msgController.js"

const router=express.Router()

router.get("/:id",protectRoute,getMsg)
router.post("/send/:id",protectRoute,sendMsg)

export default router