import { Draw, Part, Synth, Transport } from 'tone'

export type Pattern = { time: string | number; note: string; velocity: number }[]

class TransportService {
  static createPart(synth: Synth, draw: () => void, pattern: Pattern) {
    TransportService.stop()
    TransportService.partReset()
    const part = new Part((time, value) => {
      synth.triggerAttackRelease(value.note, '0.1', time, value.velocity)
      Draw.schedule(draw, time)
    }, pattern).start(0)
    part.loop = true
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

  static setBpm(bpm: number) {
    Transport.bpm.value = bpm
  }
}

export default TransportService
