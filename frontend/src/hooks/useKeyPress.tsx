import { timeLog } from "console";
import { useCallback, useEffect, useState } from "react";
import Sound from "../components/Sound";

export default function useKeypressBeats(
  targetKey: any,
  disabled: boolean,
  time: number
) {
  // State for keeping track of whether key is pressed
  const [beats, setBeats] = useState<Sound[]>([]);
  const [actionTime, setActionTime] = useState<number>(0);
  const [isDown, setIsDown] = useState<boolean>(false);

  // If pressed key is our target key then set to true
  // @ts-ignore
  const downHandler = useCallback(
    (ev) => {
      if (ev.repeat) {
        return;
      }
      ev.preventDefault();
      if (ev.key === targetKey) {
        // if (beats[beats.length - 1].type === "gap") {
        //   return;
        // }

        if (beats.length !== 0) {
          setBeats([...beats, { type: "gap", duration: time - actionTime }]);
        }
        setActionTime(time);
        setIsDown(true);
      }
    },
    [actionTime, beats, targetKey, time]
  );

  // If released key is our target key then set to false
  // @ts-ignore
  const upHandler = useCallback(
    (ev) => {
      if (ev.repeat) {
        return;
      }
      ev.preventDefault();
      if (ev.key === targetKey) {
        // if (beats[beats.length - 1].type === "beat") {
        //   return;
        // }
        const duration = time - actionTime;
        setActionTime(time);
        setBeats([...beats, { type: "beat", duration }]);
        setIsDown(false);
      }
    },
    [actionTime, beats, targetKey, time]
  );

  // Add event listeners
  useEffect(() => {
    if (!disabled) {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
    }
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [downHandler, disabled, upHandler]); // Empty array ensures that effect is only run on mount and unmount
  return { isDown, beats, actionTime };
}
