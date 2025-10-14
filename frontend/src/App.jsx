import React, { useState } from "react";
import Hero from "./components/Hero";
import CreateSession from "./components/CreateSession";
import JoinSession from "./components/JoinSession";

const App = () => {
  const [page, setPage] = useState("hero");

  if (page === "create") return <CreateSession />;
  if (page === "join") return <JoinSession />;

  return <Hero onCreate={() => setPage("create")} onJoin={() => setPage("join")} />;
};

export default App;
