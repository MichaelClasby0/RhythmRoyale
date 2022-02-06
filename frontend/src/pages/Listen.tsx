import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import PrimaryContent from "../layout/PrimaryContent";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


function Listen() {
    const navigate = useNavigate();
    const [soundComplete, setSoundComplete] = useState(false);
    useEffect(
        () => {
            let dummyTimer = setTimeout(() => setSoundComplete(true), 5 * 1000);
            return () => {
                clearTimeout(dummyTimer);
            };
        },
        []
    );
    return(
        <PrimaryContent>
            {
                soundComplete
            ? navigate("/play")
            : <h4>Listen carefully ...</h4>
            }
        </PrimaryContent>
    )
}

export default Listen;