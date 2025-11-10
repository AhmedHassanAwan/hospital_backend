import express, { Router } from "express"
import { addRoom , getAllRoom , deleteRoom , updateroom } from "../controllers/roomcontroller.js";

const router = express.Router();


router.post("/add-room" , addRoom);
router.get("/allroom" , getAllRoom);
router.put("/:id" , updateroom);
router.delete("/:id" , deleteRoom)


export default router;