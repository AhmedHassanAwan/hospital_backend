

import jwt from "jsonwebtoken";
import authModel from "../models/Auth.js";


const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModel.findById(decoded.id).select("-password");

    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
export default requireAuth;