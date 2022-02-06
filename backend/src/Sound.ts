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
