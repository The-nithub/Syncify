import React, { useState, useEffect, useRef } from "react";
import socket from "../socket";

const TRACK_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const JoinSession = () => {
  const [sessionId, setSessionId] = useState("");
  const [joined, setJoined] = useState(false);
  const audioRef = useRef(null);

  const handleJoin = () => {
    socket.emit("join-session", { sessionId });
    setJoined(true);
    // Ask host for current sync state
    socket.emit("sync-request", { sessionId });
  };

  useEffect(() => {
    socket.on("update", ({ action, time }) => {
      if (!audioRef.current) return;

      if (action === "play") {
        audioRef.current.currentTime = time;
        audioRef.current.play();
      } else if (action === "pause") {
        audioRef.current.currentTime = time;
        audioRef.current.pause();
      }
    });

    socket.on("sync-response", (session) => {
      if (audioRef.current) {
        audioRef.current.currentTime = session.currentTime;
        if (session.isPlaying) audioRef.current.play();
        else audioRef.current.pause();
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {!joined ? (
        <>
          <h2 className="text-3xl font-semibold mb-4">Join a Session</h2>
          <input
            type="text"
            placeholder="Enter session code"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
          />
          <button
            onClick={handleJoin}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Join
          </button>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl mb-3">Listening to host 🎶</h3>
          <audio ref={audioRef} src={TRACK_URL} controls className="w-80" />
        </div>
      )}
    </div>
  );
};

export default JoinSession;
