

import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/authroutes.js"
import doctorRoutes from "./routes/doctor.js"
import roomRouter from "./routes/roomroutes.js"
import appointmentRouter from "./routes/appointment.js"
import cors from "cors";

dotenv.config();
const app = express();



app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


app.use("/", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/room", roomRouter);
app.use("/appointment", appointmentRouter);


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.listen(process.env.PORT || 8000, () => {
  console.log(`✅ Server is running on port ${process.env.PORT || 3000}`);
});
