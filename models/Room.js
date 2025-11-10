
import mongoose from "mongoose";

const Schema = mongoose.Schema

const RoomSchema = new Schema({
  roomNumber: { type: Number, required: true, unique: true },
  floor: { type: Number, required: true },
  department: { type: String },
  isAvailable: { type: Boolean, default: true },

});

const Room = mongoose.model("Room", RoomSchema);
export default Room;