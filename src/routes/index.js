import express from "express";
import { login } from "../controllers/authController.js";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);

router.get("/users", getUsers);

export default router;
