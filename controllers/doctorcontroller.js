


import Doctor from "../models/Doctor.js";
import User from "../models/Auth.js";
import bcrypt from "bcryptjs";


export const addDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, availableDays, startTime, endTime, fees, experience, qualification } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Doctor already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
    });
    await user.save();

  
    const doctor = await Doctor.create({ userId: user._id, name, email, specialization, availableDays, startTime, endTime, qualification, experience, fees });

    res.status(201).json({ message: "Doctor added successfully ✅", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding doctor ❌", error });
  }
};


export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email role");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};


export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor updated successfully ✅", doctor });
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error });
  }
};


export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Remove linked user as well
    await User.findByIdAndDelete(doctor.userId);
    await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Doctor deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error });
  }
};
