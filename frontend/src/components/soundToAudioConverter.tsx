import * as Tone from 'tone';
import { Instrument } from 'tone/build/esm/instrument/Instrument';
import Sound from './sound';

export default class SoundToAudioConverter {
    synth: Instrument<any>
    constructor(synth: Instrument<any>) {
        this.synth = synth;
    }

    convertToSound(sounds: Sound[], tone: string, timeToBegin: number=Tone.now()) {
        sounds.forEach(sound => {
            if(sound.type == "beat") {
                this.synth.triggerAttackRelease(tone, sound.duration, timeToBegin);
            } 
            timeToBegin += sound.duration;
        })
    }
}