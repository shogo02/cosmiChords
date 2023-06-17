import { PolySynth } from 'tone'

class Synth {
  private synth: PolySynth

  constructor(synth: PolySynth) {
    this.synth = synth
  }

  triggerRelease(identifier: string) {
    console.log('triggerRelease')
    this.synth.triggerRelease(identifier)
  }

  triggerAttack(identifier: string) {
    console.log('triggerAttack')
    this.synth.triggerAttack(identifier)
  }

  releaseALl() {
    this.synth.releaseAll()
  }
}

export default Synth
