// routes/sessionRoutes.js
import express from "express";
import { createSession, joinSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/create", createSession);
router.get("/join/:sessionId", joinSession);

export default router;
