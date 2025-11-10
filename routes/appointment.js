
import express from "express"
import { bookAppointment , getAllAppointments , updateAppointment , deleteAppointment  , getMyAppointments , getDoctorAppointments , updateCaseNote } from "../controllers/appointment.js"

const router = express.Router();

router.post("/bookappointment" , bookAppointment);
router.get("/allappointment" , getAllAppointments);
router.get("/myappointments/:patientId", getMyAppointments);
router.get("/doctor/:doctorId", getDoctorAppointments);
router.put("/appointment/:id/casenote", updateCaseNote);


router.put("/:id" , updateAppointment);
router.delete("/:id" ,deleteAppointment);



export default router; 