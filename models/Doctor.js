import mongoose from "mongoose";

const Schema = mongoose.Schema

const DoctorSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },  
  qualification: { type: String },
  availableDays: [String],
  startTime: String,
  endTime: String,
  fees: { type: Number, default: 2000 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });


const Doctor = mongoose.model("Doctor", DoctorSchema)
export default Doctor 

