import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import PrimaryContent from "../layout/PrimaryContent";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


function Lobby() {
    const navigate = useNavigate();
    const [lobbyFound, setLobbyFound] = useState(false);
    useEffect(
        () => {
            let dummyTimer = setTimeout(() => setLobbyFound(true), 3 * 1000);
            return () => {
                clearTimeout(dummyTimer);
            };
        },
        []
    );
    return(
        <PrimaryContent>
            {
                lobbyFound
            ? navigate("/listen")
            : <h4>Finding a lobby ...</h4>
            }
        </PrimaryContent>
    )
}

export default Lobby;