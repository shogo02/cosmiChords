import { Accidental, BaseNoteNumber, DiatonicKey, DiatonicType, NoteNumber } from '../customTypes/musicalTypes'
import Chord from '../models/Chord'
import mu from '../utils/MusicalUtil'
import Util from '../utils/Util'

class ChordGenerator {
  private validChords: Chord[] = []

  createDiatonicValidChords(diatonicKey: BaseNoteNumber, diatonicType: DiatonicType, accidental: Accidental) {
    let majorScale = mu.getMajorScale()
    majorScale = majorScale.map((noteNumber) => noteNumber + diatonicKey - 1)
    majorScale.forEach((noteNumber, index) => {
      const chordType = mu.getChordTypeFromDegreeNum(index + 1, diatonicType)
      this.validChords.push(new Chord(noteNumber as NoteNumber, chordType, accidental))
    })
  }

  getRandomChord(): Chord {
    return Util.getRandomArrayElement(this.validChords)
  }
}

export default ChordGenerator
