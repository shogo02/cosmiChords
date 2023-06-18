import { MAJOR_SCALE } from '../constants/constants'
import Chord from '../models/Chord'
import GameSettings from '../models/GameSettings'
import Util from '../utils/Util'

class ChordGenerator {
  private gameSettings: GameSettings

  constructor(gameSettings: GameSettings) {
    this.gameSettings = gameSettings
  }

  generateRandomChord(): Chord {
    const chordDegree = Util.getRandomArrayElement(MAJOR_SCALE)

    return new Chord(1, '7#5', this.getAccidental())
  }

  private getAccidental() {
    return this.gameSettings.accidental
  }
}

export default ChordGenerator
