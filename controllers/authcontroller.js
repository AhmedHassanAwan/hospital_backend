import bcrypt from "bcrypt";
import User from "../models/Auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Doctor from "../models/Doctor.js";


dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

 const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Hashed password:", hashedPassword); 


    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
      role: role || "patient",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

 const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please fill all required fields" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });


    const token = generateToken(user);
const doctor= await Doctor.findOne({userId:user._id})
console.log(doctor);

   
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        doctorId : doctor?._id
      },
      token,
    });
  } catch (error) {
    console.error("❌ Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};


const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User information retrieved successfully",
      user
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export { registerUser, loginUser, getUserInfo };
