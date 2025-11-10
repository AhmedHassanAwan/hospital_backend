import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: { type: String, enum: ["patient", "doctor", "staff" , "admin"], default: "patient" },
}, { timestamps: true });



const User = mongoose.model("User", UserSchema);
export default User;
