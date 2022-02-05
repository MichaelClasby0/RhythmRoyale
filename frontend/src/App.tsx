import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/lobby" element={<Lobby/>}/>
        </Routes>
    );
}

export default App;
