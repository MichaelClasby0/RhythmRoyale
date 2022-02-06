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
  const possibleBeats: Sound[] = [
    { type: "beat", duration: millisecondsPerBeat },
    { type: "beat", duration: millisecondsPerBeat / 2 },
    { type: "beat", duration: millisecondsPerBeat / 4 },
    // { type: "beat", duration: millisecondsPerBeat / 8 },
  ];
  const possibleGaps: Sound[] = [
    { type: "gap", duration: millisecondsPerBeat / 2 },
    { type: "gap", duration: millisecondsPerBeat / 4 },
  ];
  const possibleNoteTypes: Sound[][] = [possibleBeats, possibleGaps];
  var noteTypeIndex: number = Math.floor(
    Math.random() * possibleNoteTypes.length
  );
  var currentNoteType: Sound[] = possibleNoteTypes[noteTypeIndex];
  const rhythm: Sound[] = [];

  while (length > 0) {
    const noteIndex: number = Math.floor(
      Math.random() * currentNoteType.length
    );
    const currentNote: Sound = currentNoteType[noteIndex];
    if (length - currentNote.duration < 0) {
      continue;
    }

    rhythm.push(currentNote);
    length -= currentNote.duration;

    noteTypeIndex++;
    noteTypeIndex %= possibleNoteTypes.length;
    currentNoteType = possibleNoteTypes[noteTypeIndex];
  }

  return rhythm;
}
