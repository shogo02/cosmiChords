import { AccidentalType, ChordType, NoteDegree, NoteName } from '../customTypes/musicalTypes'
import mu from '../utils/MusicalUtil'

type ChordStructure = {
  noteNumbers: number[]
  noteDegrees: NoteDegree[]
}
type ChordTypeMap = { [key in ChordType]: ChordStructure }
const CHORD_STRUCTURE_MAP: ChordTypeMap = {
  '': { noteNumbers: [1, 5, 8], noteDegrees: ['R', 'M3', 'P5'] },
  m: { noteNumbers: [1, 4, 8], noteDegrees: ['R', 'm3', 'P5'] },
  mb5: { noteNumbers: [1, 4, 7], noteDegrees: ['R', 'm3', 'b5'] },
  '5': { noteNumbers: [1, 8], noteDegrees: ['R', 'P5'] },
  dim: { noteNumbers: [1, 4, 7], noteDegrees: ['R', 'm3', 'b5'] },
  aug: { noteNumbers: [1, 5, 9], noteDegrees: ['R', 'P5', '#5'] },
  sus2: { noteNumbers: [1, 3, 8], noteDegrees: ['R', 'M2', 'P5'] },
  sus4: { noteNumbers: [1, 6, 8], noteDegrees: ['R', 'P4', 'P5'] },
  '6': { noteNumbers: [1, 5, 8, 10], noteDegrees: ['R', 'M3', 'P5', 'M6'] },
  m6: { noteNumbers: [1, 4, 8, 10], noteDegrees: ['R', 'm3', 'P5', 'M6'] },
  '7': { noteNumbers: [1, 5, 8, 11], noteDegrees: ['R', 'M3', 'P5', 'm7'] },
  M7: { noteNumbers: [1, 5, 8, 12], noteDegrees: ['R', 'M3', 'P5', 'M7'] },
  m7: { noteNumbers: [1, 4, 8, 11], noteDegrees: ['R', 'm3', 'P5', 'm7'] },
  aug7: { noteNumbers: [1, 5, 9, 11], noteDegrees: ['R', 'P5', '#5', 'm7'] },
  dim7: { noteNumbers: [1, 4, 7, 11], noteDegrees: ['R', 'm3', 'b5', 'm7'] },
  '7b5': { noteNumbers: [1, 5, 7, 11], noteDegrees: ['R', 'M3', 'b5', 'm7'] },
  '7#5': { noteNumbers: [1, 5, 9, 11], noteDegrees: ['R', 'M3', '#5', 'm7'] },
  m7b5: { noteNumbers: [1, 4, 7, 11], noteDegrees: ['R', 'm3', 'b5', 'm7'] },
  'm7#5': { noteNumbers: [1, 4, 9, 11], noteDegrees: ['R', 'm3', '#5', 'm7'] },
}

class Chord {
  private _rootNumber: number

  private _chordType: ChordType

  private _accidental: AccidentalType

  constructor(rootNumber: number, chordType: ChordType, accidental: AccidentalType = 'b') {
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

  get accidental(): AccidentalType {
    return this._accidental
  }

  get chordName(): string {
    return this.rootNoteName + this.chordType
  }

  get noteNumbers(): number[] {
    return this.getNoteNumbersInChord()
  }

  get noteDegrees(): NoteDegree[] {
    return this.getChordDegreeInChord()
  }

  get noteNames(): NoteName[] {
    return this.getNoteNamesInChord()
  }

  get rootNoteName(): NoteName {
    return this.convertNoteNumberToName(this.rootNumber)
  }

  private static validateRootNumber(rootNumber: number): void {
    if (rootNumber < 1 || rootNumber > 12) {
      throw new Error('Number value must be between 1 and 12')
    }
  }

  /**
   * コード構成音を返す
   * @param rootNumber 1 ~ 12
   * @param chordType
   * @param accidental
   * @returns
   */
  private getNoteNamesInChord(): NoteName[] {
    mu.isIn1Octobe(this.rootNumber)
    return this.noteNumbers.map((noteNumber) => {
      const calcNoteNumber = mu.fixedNoteNumber(this.rootNumber + noteNumber - 1)
      return this.convertNoteNumberToName(calcNoteNumber)
    })
  }

  private getNoteNumbersInChord(): number[] {
    return CHORD_STRUCTURE_MAP[`${this.chordType}`].noteNumbers
  }

  private getChordDegreeInChord(): NoteDegree[] {
    return CHORD_STRUCTURE_MAP[`${this.chordType}`].noteDegrees
  }

  /**
   * 2オクターブ以内のNoteNumberから音名を取得する
   * @param noteNumber 1 ~ 24
   * @param accidental
   * @returns
   */
  private convertNoteNumberToName(noteNumber: number): NoteName {
    if (mu.isIn2Octobe(noteNumber)) throw new Error(`Invalid note number: ${noteNumber}`)
    if (noteNumber === 1 || noteNumber === 13) return 'C'
    if (noteNumber === 2 || noteNumber === 14) return this.isSharp() ? 'C#' : 'Db'
    if (noteNumber === 3 || noteNumber === 15) return 'D'
    if (noteNumber === 4 || noteNumber === 16) return this.isSharp() ? 'D#' : 'Eb'
    if (noteNumber === 5 || noteNumber === 17) return 'E'
    if (noteNumber === 6 || noteNumber === 18) return 'F'
    if (noteNumber === 7 || noteNumber === 19) return this.isSharp() ? 'F#' : 'Gb'
    if (noteNumber === 8 || noteNumber === 20) return 'G'
    if (noteNumber === 9 || noteNumber === 21) return this.isSharp() ? 'G#' : 'Ab'
    if (noteNumber === 10 || noteNumber === 22) return 'A'
    if (noteNumber === 11 || noteNumber === 23) return this.isSharp() ? 'A#' : 'Bb'
    return 'B' // 12 or 24
  }

  private isSharp(): boolean {
    return this.accidental === '#'
  }
}

export default Chord
