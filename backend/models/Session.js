// models/Session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  hostSocketId: {
    type: String,
    required: true,
  },
  currentSong: {
    type: String,
    default: null,
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Session", sessionSchema);
