

import mongoose from "mongoose";

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  caseNotes: {
  type: String,
  default: "",
},
  status: {
    type: String,
    enum: ["Booked", "Checked-in", "Completed", "Cancelled"],
    default: "Booked",
  },
})

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;