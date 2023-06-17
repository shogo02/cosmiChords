import { type } from 'os'
import { Draw, Master, Part, Synth, Transport } from 'tone'

export type Pattern = { time: string | number; note: string; velocity: number }[]

class TransportService {
  private synth: Synth

  private pattern: Pattern = []

  private draw: () => void

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(synth: Synth, pattern: Pattern, draw: () => void = () => {}) {
    this.synth = synth
    this.pattern = pattern
    this.draw = draw
  }

  createPart() {
    TransportService.stop()
    TransportService.partReset()
    const part = new Part((time, value) => {
      this.synth.triggerAttackRelease(value.note, '0.1', time, value.velocity)
      if (this.draw) Draw.schedule(this.draw, time)
    }, this.pattern).start(0)
    part.loop = true
    // console.log(part);
    // Transport.bpm.value = 120
    // Master.volume.value = 0
    // Transport.toggle();
  }

  static start() {
    Transport.start()
  }

  static stop() {
    Transport.stop()
  }

  static getCurrentBeat() {
    return Transport.position.toString().split(':').map(Number)[1] + 1
  }

  static partReset() {
    Transport.cancel()
  }

  static toggleTransport() {
    Transport.toggle()
  }
}

export default TransportService
