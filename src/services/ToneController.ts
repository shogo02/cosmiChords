import { Destination } from 'tone'

class ToneController {
  static setMasterVolume(value: number) {
    Destination.volume.value = value
  }
}

export default ToneController
