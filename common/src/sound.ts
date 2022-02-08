export interface Sound {
  type: "beat" | "gap";
  duration: number;
}

export function rhythmsMatch(
  control: Sound[],
  user: Sound[],
  tolorance = 0.1
): boolean {
  if (control.length !== user.length) {
    return false;
  }

  for (let i = 0; i < control.length; i++) {
    const duration_tolorance = control[i].duration * tolorance;
    if (
      control[i].type !== user[i].type ||
      Math.abs(control[i].duration - user[i].duration) > duration_tolorance
    ) {
      return false;
    }
  }

  return true;
}

export function generateRhythm(length = 3000, tempo = 120): Sound[] {
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
  let noteTypeIndex: number = Math.floor(
    Math.random() * possibleNoteTypes.length
  );
  let currentNoteType: Sound[] = possibleNoteTypes[noteTypeIndex];
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
