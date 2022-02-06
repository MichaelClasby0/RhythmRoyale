import PrimaryContent from "../layout/PrimaryContent";
import * as Tone from "tone";
import { useEffect } from "react";

function Listen() {
  const synthA = new Tone.PolySynth().toDestination();
  const plucky = new Tone.PluckSynth().toDestination();

  const loopA = new Tone.Loop((time) => {
    plucky.triggerAttack("C4", "+0.5");
  }, "4n").start(0);

  useEffect(() => {
    Tone.Transport.start();
  });

  return (
    <PrimaryContent>
      <button onClick={async () => await Tone.start()}>Start</button>
    </PrimaryContent>
  );
}

export default Listen;
