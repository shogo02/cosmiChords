import { AccidentalType, DiatonicType } from '../customTypes/musicalTypes'
import Chord from '../models/Chord'
import mu from '../utils/MusicalUtil'
import Util from '../utils/Util'

class ChordGenerator {
  private validChords: Chord[] = []

  createDiatonicValidChords(diatonicKey: number, diatonicType: DiatonicType, accidental: AccidentalType) {
    const majorScale = mu.getMajorScale(diatonicKey)
    majorScale.forEach((noteNumber, index) => {
      const chordType = mu.getChordTypeFromDegreeNum(index + 1, diatonicType)
      this.validChords.push(new Chord(mu.fixedNoteNumber(noteNumber), chordType, accidental))
    })
  }

  getRandomChord(): Chord {
    return Util.getRandomArrayElement(this.validChords)
  }
}

export default ChordGenerator
