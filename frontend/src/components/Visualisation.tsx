import PrimaryContent from "../layout/PrimaryContent";
import "./Visualisation.css";
import { useState, useEffect } from "react";
import useKeypressBeats from "../hooks/useKeyPress";

function Vis() {
  // @ts-ignore
  const isDown = useKeypressBeats(" ")[0];
  const time_limit = 3 * 1000;
  const [circles, setCircles] = useState<Array<number>>([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time * 5 > time_limit) {
        clearInterval(interval);
        return;
      }

      if (isDown) {
        setCircles([...circles, time]);
      }
      setTime(time + 2);
    }, 10);
    return () => clearInterval(interval);
  }, [time, circles, time_limit, isDown]);

  return (
    <PrimaryContent>
      <div className="rect">
        {circles.map((circle, index) => {
          return (
            <span
              className="circle"
              style={{ left: circle.toString() + "px" }}
              key={index}
            />
          );
        })}
      </div>
    </PrimaryContent>
  );
}

// @ts-ignore
function Anim({ original }) {
  const time_limit = 3 * 1000;
  const [beats, setBeats] = useState(original);
  const [circles, setCircles] = useState<Array<number>>([]);
  const [time, setTime] = useState(75);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time * 5 > time_limit) {
        clearInterval(interval);
        return;
      }

      const curr = beats[0];
      if (curr.type === "beat") {
        setCircles([...circles, time]);
      }
      if (curr.duration < 10) {
        setBeats(beats.slice(1));
      } else {
        setBeats([
          { type: curr.type, duration: curr.duration - 10 },
          ...beats.slice(1),
        ]);
      }
      setTime(time + 2);
    }, 10);
    return () => clearInterval(interval);
  }, [time, circles, beats, time_limit]);

  return (
    <PrimaryContent>
      <div className="rect">
        {circles.map((circle, index) => {
          return (
            <span
              className="circle"
              style={{ left: circle.toString() + "px" }}
              key={index}
            />
          );
        })}
      </div>
    </PrimaryContent>
  );
}

export { Vis, Anim };
