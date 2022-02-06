import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Listen from "./pages/Listen";
import Record from "./pages/Record";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/lobby" element={<Lobby/>}/>
            <Route path="/listen" element={<Listen/>}/>
            <Route path="/record" element={<Record/>}/>
        </Routes>
    );
}

export default App;
