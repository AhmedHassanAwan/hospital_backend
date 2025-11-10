import express from "express";
import {addDoctor , updateDoctor , deleteDoctor , getAllDoctors}  from "../controllers/doctorcontroller.js"

const router = express.Router()

router.post("/add-doctor", addDoctor);
router.get("/alldoctor" , getAllDoctors);
router.put("/:id" , updateDoctor);
router.delete("/:id" , deleteDoctor)


export default router;