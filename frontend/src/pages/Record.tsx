import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import PrimaryContent from "../layout/PrimaryContent";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {ProgressBar} from "react-bootstrap";
import useKeyPress from "../hooks/useKeyPress";

interface Beat {
    down: boolean,
    duration: number,
}

function Record() {
    const navigate = useNavigate();

    const spacePressed = useKeyPress(" ");
    const [beats, setBeats] = useState([{down: false, duration: 1}])
    const [down, setDown] = useState(true)
    const total_length = 100;
    const [filled, setFilled] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (filled >= total_length) {
                return
            }
            // If current beat is same as pressed, make it longer
            if (beats[beats.length - 1].down === spacePressed) {
                let last = beats[beats.length - 1]
                last.duration += 1
                setBeats([...beats.slice(0, -1), last])
            } else {
                // Create a new beat
                setDown(!down)
                setBeats([...beats, {down: down, duration: 1}])
            }
            setFilled(filled + 1)
        }, 100);
        return () => clearInterval(interval);
    }, [filled, beats]);

    return(
        <PrimaryContent max={filled}>
            {beat_to_bar(beats)}
        </PrimaryContent>
    )
}

export function beat_to_bar(beats: Beat[]) {
    return (
        <ProgressBar>
            {beats.map((beat, index) => {
                const variant = beat.down ? "danger" : "info";
                return (<ProgressBar variant={variant} now={beat.duration} key={index}/>);
            })}
        </ProgressBar>
    );
}


export default Record;