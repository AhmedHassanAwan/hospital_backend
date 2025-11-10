import Appointment from "../models/Appointment.js";
  import Doctor from "../models/Doctor.js";
import User from "../models/Auth.js";



export const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;

    const doctor = await Doctor.findOne({ 
  $or: [{ _id: doctorId }, { userId: doctorId }]
});
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const selectedDay = new Date(appointmentDate).toLocaleDateString("en-US", { weekday: "long" });
    if (!doctor.availableDays.includes(selectedDay)) {
      return res.status(400).json({ message: `Doctor is not available on ${selectedDay}` });
    }
    const existing = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: { $ne: "Cancelled" },
    });

    if (existing) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      status: "Booked",
    });
    await appointment.save();

    return res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error booking appointment", error });
  }
};


export const getMyAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name specialization")
      .sort({ appointmentDate: -1 });

        if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};


export const updateCaseNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { caseNotes } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { caseNotes },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Case notes updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating case notes", error });
  }
};



export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name email")
      .sort({ appointmentDate: -1 });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};



export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: "doctorId",
        populate: {
          path: "userId", 
          select: "name email" 
        },
        select: "specialization" 
      })
      .populate("patientId", "name email")
      .sort({ appointmentDate: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.log("❌ Error in getAllAppointments:", error);
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};


export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error });
  }
};


export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment cancelled", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling appointment", error });
  }
};
