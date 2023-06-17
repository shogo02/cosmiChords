import { PolySynth, Synth } from 'tone'

class SynthCreator {
  static createSynth() {
    return new Synth({
      envelope: { release: 0.4 },
    }).toDestination()
  }

  static createPolySynth() {
    return new PolySynth(Synth, {
      envelope: { attack: 0.01 },
    }).toDestination()
  }
}

export default SynthCreator
