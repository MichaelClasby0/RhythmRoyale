import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Listen from "./pages/Listen";
import Play from "./pages/Play";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/lobby" element={<Lobby/>}/>
            <Route path="/listen" element={<Listen/>}/>
            <Route path="/play" element={<Play/>}/>
        </Routes>
    );
}

export default App;
