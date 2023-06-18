import { MAJOR_SCALE } from '../constants/constants'
import { Accidental, BaseNoteNumber, DiatonicKey } from '../customTypes/musicalTypes'
import Chord from '../models/Chord'
import GameSettings from '../models/GameSettings'
import mu from '../utils/MusicalUtil'

class ChordGenerator {
  static generateRandomChord(diatonicKey: DiatonicKey, accidental: Accidental): Chord {
    const majorScaleRoot = mu.getRandomMajorScaleRoot() - 1
    const keyNoteNumber = mu.getNoteNumberFromDatonicKey(diatonicKey)
    const rootNumber = (keyNoteNumber + majorScaleRoot) as BaseNoteNumber
    return new Chord(rootNumber, '7', accidental)
  }
}

export default ChordGenerator
