
import Room from "../models/Room.js"

export const addRoom = async (req, res) => {
  const { roomNumber, floor, department } = req.body;

  try {

    const roomcheck = await Room.findOne({ roomNumber });


    if (roomcheck) {
      return res.status(400).json({ message: "Room number already exists. Please choose a different number." });
    }

    const room = new Room({ roomNumber, floor, department });

    await room.save();
    res.status(201).json({ message: "Room added successfully", room });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding room", error });
  }
};




export const getAllRoom = async (req, res) => {
    try {
        const rooms = await Room.find()
        return res.status(201).json(rooms)

    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error });

    }
};



export const updateroom = async (req,res) => {
     try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error });
  }
}


export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error });
  }
}