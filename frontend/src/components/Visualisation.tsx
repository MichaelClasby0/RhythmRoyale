import PrimaryContent from "../layout/PrimaryContent";
import "./Visualisation.css";
import { useState, useEffect } from "react";
import useKeypressBeats from "../hooks/useKeyPress";
import Sound from "./Sound";

function Vis(props: { onEnd: (beats: Sound[]) => void }) {
  const { onEnd } = props;
  const [disabled, setDisabled] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const { isDown, beats, actionTime } = useKeypressBeats(
    " ",
    disabled,
    totalTime
  );
  const time_limit = 3 * 1000;
  const [circles, setCircles] = useState<Array<number>>([]);
  const [time, setTime] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time * 5 > time_limit) {
        setDisabled(true);
        clearInterval(interval);
        if (isDown) {
          onEnd([
            ...beats,
            { type: "beat", duration: time_limit - actionTime },
          ]);
        } else {
          onEnd([...beats, { type: "gap", duration: time_limit - actionTime }]);
        }
        return;
      }

      if (isDown) {
        setCircles([...circles, time]);
      }
      setTime(time + 2);
      setTotalTime(totalTime + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [time, circles, time_limit, isDown, onEnd, beats, totalTime, actionTime]);

  return (
    <PrimaryContent>
      <div className="big-rect">
        {circles.map((circle, index) => {
          return (
            <span
              className="big-circle"
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
function Anim({ original, correct }) {
  if (!original) {
    original = [
      { type: "beat", duration: 600 },
      { type: "gap", duration: 400 },
      { type: "beat", duration: 500 },
      { type: "gap", duration: 300 },
      { type: "beat", duration: 1200 },
    ];
  }

  const time_limit = 800;
  const [beats, setBeats] = useState(original);
  const [circles, setCircles] = useState<Array<number>>([]);
  const [time, setTime] = useState(20);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time * 2.5 > time_limit) {
        setDone(true);
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
      setTime(time + 1);
    }, 10);
    return () => clearInterval(interval);
  }, [time, circles, beats]);

  return (
    <PrimaryContent>
      {done ? (
        <div
          className="result"
          style={{ background: correct ? "green" : "red" }}
        >
          {correct ? "Correct" : "Incorrect"}
        </div>
      ) : null}
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
