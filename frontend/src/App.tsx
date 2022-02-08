import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Replay from "./pages/Replay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Replay/>}/>
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
