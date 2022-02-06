import { useCallback, useEffect, useState } from "react";
import Sound from "../components/Sound";

export default function useKeypressBeats(targetKey: any, disabled: boolean) {
  // State for keeping track of whether key is pressed
  const [beats, setBeats] = useState<Sound[]>([]);
  const [actionTime, setActionTime] = useState<number>(0);
  const [isDown, setIsDown] = useState<boolean>(false);

  // If pressed key is our target key then set to true
  // @ts-ignore
  const downHandler = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        const currentTime = Date.now();

        if (beats.length !== 0) {
          setBeats([
            ...beats,
            { type: "gap", duration: currentTime - actionTime },
          ]);
        }
        setActionTime(currentTime);
        setIsDown(true);
      }
    },
    [actionTime, beats, targetKey]
  );

  // If released key is our target key then set to false
  // @ts-ignore
  const upHandler = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        const currentTime = Date.now();
        const duration = currentTime - actionTime;
        setBeats([...beats, { type: "beat", duration }]);
        setIsDown(false);
      }
    },
    [actionTime, beats, targetKey]
  );

  // Add event listeners
  useEffect(() => {
    if (!disabled) {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
    }
    // Remove event listeners on cleanup
    return () => {
      if (!disabled) {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      }
    };
  }, [downHandler, disabled, upHandler]); // Empty array ensures that effect is only run on mount and unmount
  return { isDown, beats };
}
