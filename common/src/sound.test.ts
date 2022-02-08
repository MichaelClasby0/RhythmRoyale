import { Sound, rhythmsMatch } from "./sound";

describe("Rythm Matching", () => {
  test("single exact beats match", () => {
    const control: Sound[] = [{ type: "beat", duration: 500 }];
    const user: Sound[] = [{ type: "beat", duration: 500 }];

    expect(rhythmsMatch(control, user)).toBe(true);
  });

  test("single exact gaps match", () => {
    const control: Sound[] = [{ type: "gap", duration: 500 }];
    const user: Sound[] = [{ type: "gap", duration: 500 }];

    expect(rhythmsMatch(control, user)).toBe(true);
  });

  test("rhythms with different lengths don't match", () => {
    const control: Sound[] = [
      { type: "gap", duration: 500 },
      { type: "gap", duration: 500 },
    ];
    const user: Sound[] = [{ type: "gap", duration: 500 }];

    expect(rhythmsMatch(control, user)).toBe(false);
  });

  test("rhythms with single sound outside the tolorance don't match", () => {
    const tolorance = 0.1;
    const control: Sound[] = [{ type: "gap", duration: 500 }];
    const userUpper: Sound[] = [{ type: "gap", duration: 551 }];
    const userLower: Sound[] = [{ type: "gap", duration: 449 }];

    expect(rhythmsMatch(control, userUpper, tolorance)).toBe(false);
    expect(rhythmsMatch(control, userLower, tolorance)).toBe(false);
  });

  test("rhythms with single sound within the tolorance match", () => {
    const tolorance = 0.1;
    const control: Sound[] = [{ type: "gap", duration: 500 }];
    const userUpper: Sound[] = [{ type: "gap", duration: 550 }];
    const userBetween: Sound[] = [{ type: "gap", duration: 512 }];
    const userLower: Sound[] = [{ type: "gap", duration: 450 }];

    expect(rhythmsMatch(control, userUpper, tolorance)).toBe(true);
    expect(rhythmsMatch(control, userBetween, tolorance)).toBe(true);
    expect(rhythmsMatch(control, userLower, tolorance)).toBe(true);
  });

  test("rhythms with multiple sounds within the tolorance match", () => {
    const tolorance = 0.1;
    const control: Sound[] = [
      { type: "gap", duration: 200 },
      { type: "beat", duration: 400 },
      { type: "gap", duration: 100 },
      { type: "beat", duration: 500 },
      { type: "gap", duration: 100 },
    ];
    const user: Sound[] = [
      { type: "gap", duration: 183 },
      { type: "beat", duration: 389 },
      { type: "gap", duration: 109 },
      { type: "beat", duration: 524 },
      { type: "gap", duration: 102 },
    ];

    expect(rhythmsMatch(control, user, tolorance)).toBe(true);
  });

  test("rhythms with multiple sounds not within the tolorance don't match", () => {
    const tolorance = 0.1;
    const control: Sound[] = [
      { type: "gap", duration: 200 },
      { type: "beat", duration: 400 },
      { type: "gap", duration: 100 },
      { type: "beat", duration: 500 },
      { type: "gap", duration: 100 },
    ];
    const user: Sound[] = [
      { type: "gap", duration: 183 },
      { type: "beat", duration: 389 },
      { type: "gap", duration: 109 },
      { type: "beat", duration: 551 },
      { type: "gap", duration: 102 },
    ];

    expect(rhythmsMatch(control, user, tolorance)).toBe(false);
  });
});
