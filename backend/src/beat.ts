import Stroke from "./stroke";

const bpm = 120;
const noteDivisions = 16;

class beat {

    strokes: Stroke[] = [];

    constructor() {
        this.convolute()
    }

    convolute(): void {
        const interval = this.generateTimeFrame(2);
        const duration = this.generateTimeFrame(1);

        const key = " ";

        this.strokes.push(new Stroke(interval, duration, key));
    }

    generateTimeFrame(maxNotes): number {
        return Math.floor(Math.random() * (maxNotes * noteDivisions + 1)) / noteDivisions * 60 * 1000 / bpm;
    }
}
