import express from "express";
import { registerUser, loginUser, getUserInfo } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getUserInfo);

export default router;
