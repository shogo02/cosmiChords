import Constants from '../constants/constants'
import { Accidental, ChordType, NoteDegree, NoteName } from '../customTypes/musicalTypes'
import mu from '../utils/MusicalUtil'

class Chord {
  private _rootNumber: number

  private _chordType: ChordType

  private _accidental: Accidental

  constructor(rootNumber: number, chordType: ChordType, accidental: Accidental = '') {
    Chord.validateRootNumber(rootNumber)
    this._rootNumber = rootNumber
    this._chordType = chordType
    this._accidental = accidental
  }

  get rootNumber(): number {
    return this._rootNumber
  }

  get chordType(): ChordType {
    return this._chordType
  }

  get accidental(): Accidental {
    return this._accidental
  }

  set accidental(accidental: Accidental) {
    this._accidental = accidental
  }

  get chordName(): string {
    return this.rootName + this.chordType
  }

  get noteNumbers(): number[] {
    return Constants.getNotesInChordNumber(this.chordType)
  }

  get noteDegrees(): NoteDegree[] {
    return Constants.getNotesInChordDegree(this.chordType)
  }

  get noteNames(): NoteName[] {
    return mu.getNoteNamesInChord(this.rootNumber, this.chordType, this.accidental)
  }

  get rootName(): NoteName {
    return mu.noteNumberToName(this.rootNumber, this.accidental)
  }

  private static validateRootNumber(rootNumber: number): void {
    if (rootNumber < 1 || rootNumber > 12) {
      throw new Error('Number value must be between 1 and 12')
    }
  }
}

export default Chord
