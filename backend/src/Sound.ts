export default interface Sound {
  type: "beat" | "gap";
  duration: number;
}

const TOLORANCE = 0.1;

export function areSoundsMatch(a: Sound[], b: Sound[]) {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    const tolorance_val = b[i].duration * TOLORANCE;
    if (
      a[i].type !== b[i].type ||
      Math.abs(a[i].duration - b[i].duration) > tolorance_val
    ) {
      return false;
    }
  }

  return true;
}

// tempo in bpm
// length in milliseconds
export function generateRhythm(length: number = 3000, tempo: number = 120) {
  const millisecondsPerBeat: number = (tempo / 60) * 1000;
  const possibleNotes: Sound[] = [
    { type: "beat", duration: millisecondsPerBeat },
    { type: "beat", duration: millisecondsPerBeat / 2 },
    { type: "beat", duration: millisecondsPerBeat / 4 },
    { type: "beat", duration: millisecondsPerBeat / 8 },
    { type: "gap", duration: millisecondsPerBeat / 2 },
    { type: "gap", duration: millisecondsPerBeat / 4 },
  ];
  const rhythm: Sound[] = [];

  while (length > 0) {
    const noteIndex: number = Math.floor(Math.random() * possibleNotes.length);
    if (length - possibleNotes[noteIndex].duration < 0) {
      continue;
    }

    rhythm.push(possibleNotes[noteIndex]);
    length -= possibleNotes[noteIndex].duration;
  }

  return rhythm;
}
