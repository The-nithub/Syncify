// controllers/sessionController.js
import Session from "../models/Session.js";
import { nanoid } from "nanoid"; // to generate unique session IDs

// Create new session
export const createSession = async (req, res) => {
  try {
    const sessionId = nanoid(6); // generate a short code
    const hostSocketId = req.body.hostSocketId;

    const newSession = new Session({ sessionId, hostSocketId });
    await newSession.save();

    res.status(201).json({ sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create session" });
  }
};

// Join existing session
export const joinSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findOne({ sessionId });

    if (!session) return res.status(404).json({ error: "Session not found" });

    res.status(200).json({ message: "Joined successfully", session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to join session" });
  }
};
