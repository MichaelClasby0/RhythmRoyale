import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Listen from "./pages/Listen";
import Record from "./pages/Record";
import {Anim, Vis} from "./components/Visualisation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Anim original={[
            { type: "beat", duration: 600 },
            { type: "gap", duration: 400 },
            { type: "beat", duration: 500 },
            { type: "gap", duration: 300 },
            { type: "beat", duration: 1200 },
        ]} />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
