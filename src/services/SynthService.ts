import { PolySynth } from 'tone'

class SynthService {
  private synth: PolySynth

  constructor(synth: PolySynth) {
    this.synth = synth
  }

  noteOn(noteName: string) {
    this.synth.triggerRelease(noteName)
    this.synth.triggerAttack(noteName)
  }

  noteOff(noteName: string) {
    this.synth.triggerRelease(noteName)
  }
}

export default SynthService
