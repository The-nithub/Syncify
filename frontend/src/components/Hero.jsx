import React from "react";

const Hero = ({ onCreate, onJoin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-600 to-purple-700 text-white text-center p-4">
      <h1 className="text-5xl font-bold mb-6">🎵 SyncBeats</h1>
      <p className="mb-8 text-lg opacity-90">
        Listen to music together in real-time — no login, no fuss.
      </p>
      <div className="flex gap-6">
        <button
          onClick={onCreate}
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Create Session
        </button>
        <button
          onClick={onJoin}
          className="bg-transparent border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition"
        >
          Join Session
        </button>
      </div>
    </div>
  );
};

export default Hero;
