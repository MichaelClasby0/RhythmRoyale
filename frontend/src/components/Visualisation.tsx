import PrimaryContent from "../layout/PrimaryContent";
import "./Visualisation.css"
import {useState, useEffect} from "react";
import useKeypressBeats from "../hooks/useKeyPress";

function Vis() {
    const isDown = useKeypressBeats(" ")[0]
    const time_limit = 3 * 1000
    const [circles, setCircles] = useState<Array<number>>([])
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {

            if (time * 5 > time_limit) {
                clearInterval(interval);
                return;
            }

            if (isDown) {
                setCircles([...circles, time])
            }
            setTime(time + 2)
        }, 10);
        return () => clearInterval(interval);
    }, [time]);

    return (
        <PrimaryContent>
            <div className="rect">
            {
                circles.map((circle, index) => {
                    return <span className="circle" style={{left: circle.toString() + "px"}} key={index}/>
                })
            }
            </div>
        </PrimaryContent>
    );
}

//
export default Vis;