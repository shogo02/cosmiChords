// import { ToneAudioNode } from 'tone';
// import * as Tone from 'tone'

import { PolySynth } from "tone";


class SynthService {
    private synth: PolySynth

    constructor(synth: PolySynth) {
        this.synth = synth
    }

    noteOn(identifier: string) {
        this.synth.triggerRelease(identifier)
        this.synth.triggerAttack(identifier)
    }

    noteOff(identifier: string) {
        this.synth.triggerRelease(identifier)
    }
}

export default SynthService;