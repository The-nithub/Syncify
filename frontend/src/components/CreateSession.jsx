import React, { useState, useRef } from "react";
import axios from "axios";
import socket from "../socket";

const TRACK_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const CreateSession = () => {
  const [sessionId, setSessionId] = useState(null);
  const audioRef = useRef(null);

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/session/create", {
        hostSocketId: socket.id,
      });
      const newSessionId = res.data.sessionId;
      setSessionId(newSessionId);
      socket.emit("create-session", newSessionId);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlay = () => {
    const time = audioRef.current.currentTime;
    audioRef.current.play();
    socket.emit("control", { sessionId, action: "play", time });
  };

  const handlePause = () => {
    const time = audioRef.current.currentTime;
    audioRef.current.pause();
    socket.emit("control", { sessionId, action: "pause", time });
  };

  if (!sessionId)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Create a New Session</h2>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition"
        >
          Create Session
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">
        Session ID: <span className="text-indigo-600">{sessionId}</span>
      </h2>
      <audio ref={audioRef} src={TRACK_URL} controls className="mb-4 w-80" />
      <div className="flex gap-4">
        <button
          onClick={handlePlay}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          ▶️ Play
        </button>
        <button
          onClick={handlePause}
          className="bg-red-600 text-white px-6 py-2 rounded-lg"
        >
          ⏸ Pause
        </button>
      </div>
    </div>
  );
};

export default CreateSession;
