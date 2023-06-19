import { MAJOR_SCALE } from '../constants/constants'
import { Accidental, NoteNumber, ChordType, NoteDegree, NoteName, BaseNoteNumber, DiatonicKey } from '../customTypes/musicalTypes'
import Util from './Util'

type ChordStructure = {
  noteNumbers: NoteNumber[]
  noteDegrees: NoteDegree[]
}
type ChordTypeMap = { [key in ChordType]: ChordStructure }
const CHORD_STRUCTURE_MAP: ChordTypeMap = {
  '': { noteNumbers: [1, 5, 8], noteDegrees: ['R', 'M3', 'P5'] },
  m: { noteNumbers: [1, 4, 8], noteDegrees: ['R', 'm3', 'P5'] },
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

class MusicalUtil {
  private static fixeNoteNumber(noteNumber: NoteNumber): BaseNoteNumber {
    return (noteNumber > 12 ? noteNumber - 12 : noteNumber) as BaseNoteNumber
  }

  private static getNoteName(noteNumber: BaseNoteNumber, accidental: Accidental): NoteName {
    if (noteNumber === 1) return 'C'
    if (noteNumber === 2) return accidental === '#' ? 'C#' : 'Db'
    if (noteNumber === 3) return 'D'
    if (noteNumber === 4) return accidental === '#' ? 'D#' : 'Eb'
    if (noteNumber === 5) return 'E'
    if (noteNumber === 6) return 'F'
    if (noteNumber === 7) return accidental === '#' ? 'F#' : 'Gb'
    if (noteNumber === 8) return 'G'
    if (noteNumber === 9) return accidental === '#' ? 'G#' : 'Ab'
    if (noteNumber === 10) return 'A'
    if (noteNumber === 11) return accidental === '#' ? 'A#' : 'Bb'
    if (noteNumber === 12) return 'B'
    throw new Error(`Invalid note number: ${noteNumber as number}`)
  }

  static noteNumberToName(noteNumber: NoteNumber, accidental: Accidental): NoteName {
    const fixedNoteNumber = MusicalUtil.fixeNoteNumber(noteNumber)
    const baseNote: NoteName = MusicalUtil.getNoteName(fixedNoteNumber, accidental)
    return baseNote
  }

  static getNotesInChordNumber(chordType: ChordType): NoteNumber[] {
    return CHORD_STRUCTURE_MAP[`${chordType}`].noteNumbers
  }

  static getNotesInChordDegree(chordType: ChordType): NoteDegree[] {
    return CHORD_STRUCTURE_MAP[`${chordType}`].noteDegrees
  }

  static getNoteNamesInChord(rootNumber: BaseNoteNumber, chordType: ChordType, accidental: Accidental) {
    const notesInChordNumber = MusicalUtil.getNotesInChordNumber(chordType)
    const noteNamesInChord: NoteName[] = []
    notesInChordNumber.forEach((noteNumber, index) => {
      const calcNoteNumber = (rootNumber + noteNumber - 1) as BaseNoteNumber
      const noteName = MusicalUtil.noteNumberToName(calcNoteNumber, accidental)
      noteNamesInChord.push(noteName)
    })
    return noteNamesInChord
  }

  static getRandomMajorScaleRoot() {
    return Util.getRandomArrayElement(MAJOR_SCALE)
  }

  static getNoteNumberFromDatonicKey(diatonicKey: DiatonicKey) {
    if (diatonicKey === 'C') return 1
    if (diatonicKey === 'Db') return 2
    if (diatonicKey === 'D') return 3
    if (diatonicKey === 'Eb') return 4
    if (diatonicKey === 'E') return 5
    if (diatonicKey === 'F') return 6
    if (diatonicKey === 'F#') return 7
    if (diatonicKey === 'G') return 8
    if (diatonicKey === 'Ab') return 9
    if (diatonicKey === 'A') return 10
    if (diatonicKey === 'Bb') return 11
    if (diatonicKey === 'B') return 12
    throw new Error('Invalid diatonic key')
  }
}

export default MusicalUtil
