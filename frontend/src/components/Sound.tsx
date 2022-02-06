import * as Tone from "tone";
import { Instrument } from "tone/build/esm/instrument/Instrument";

export default interface Sound {
  type: "beat" | "gap";
  duration: number;
}

export function convertToSound(
  sounds: Sound[],
  synth: Instrument<any>,
  tone: string = "C3",
  timeToBegin: number = Tone.now()
) {
  sounds.forEach((sound) => {
    console.log(timeToBegin);
    if (sound.type === "beat") {
      synth.triggerAttackRelease(tone, sound.duration / 1000, timeToBegin);
    }
    timeToBegin += sound.duration / 1000;
  });
}
