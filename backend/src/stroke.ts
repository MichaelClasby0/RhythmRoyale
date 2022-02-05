export default

class Stroke {
    data: [Number, Number, String] = [NaN, NaN, ""];

    constructor(timeSinceLast: Number, duration: Number, key: String) {
        this.data = [timeSinceLast, duration, key];
    }
}