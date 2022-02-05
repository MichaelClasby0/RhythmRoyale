import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { SocketContext } from "./context/socket";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";

function App() {
  const socket = useMemo(() => io("http://localhost:5000"), []);

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
