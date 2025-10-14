// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import sessionRoutes from "./routes/sessionRoutes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Enable CORS for frontend connection
app.use(cors());
app.use(express.json());


app.use("/api/session", sessionRoutes);


// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*", // you can restrict this later to your frontend
    methods: ["GET", "POST"],
  },
});

// In-memory store for sessions (we’ll later link this to MongoDB)
let sessions = {};

// 🧠 Socket.io events
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join-session", ({ sessionId }) => {
    socket.join(sessionId);
    console.log(`User ${socket.id} joined session ${sessionId}`);
  });

  socket.on("create-session", (sessionId) => {
    sessions[sessionId] = { currentSong: null, isPlaying: false, currentTime: 0 };
    console.log(`🎵 Session ${sessionId} created`);
  });

  // Host plays or pauses music
  socket.on("control", ({ sessionId, action, time }) => {
    if (sessions[sessionId]) {
      sessions[sessionId].isPlaying = action === "play";
      sessions[sessionId].currentTime = time;
    }
    // Broadcast to all listeners
    io.to(sessionId).emit("update", { action, time });
  });

  // Sync new listener with current state
  socket.on("sync-request", ({ sessionId }) => {
    const session = sessions[sessionId];
    if (session) {
      socket.emit("sync-response", session);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
