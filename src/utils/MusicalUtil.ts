import {
  Accidental,
  NoteNumber,
  ChordType,
  NoteDegree,
  NoteName,
  BaseNoteNumber,
  DiatonicKeyType,
} from '../customTypes/musicalTypes'

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

export const INTERVALS: { [key in DiatonicKeyType]: number } = {
  Gb: -6,
  G: -5,
  Ab: -4,
  A: -3,
  Bb: -2,
  B: -1,
  C: 0,
  Db: 1,
  D: 2,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
}

class MusicalUtil {
  private static fixeNoteNumber(noteNumber: NoteNumber): BaseNoteNumber {
    return (noteNumber > 12 ? noteNumber - 12 : noteNumber) as BaseNoteNumber
  }

  private static getNoteName(noteNumber: BaseNoteNumber, accidental: Accidental): NoteName {
    switch (noteNumber) {
      case 1:
        return 'C'
      case 2:
        return accidental === '#' ? 'C#' : 'Db'
      case 3:
        return 'D'
      case 4:
        return accidental === '#' ? 'D#' : 'Eb'
      case 5:
        return 'E'
      case 6:
        return 'F'
      case 7:
        return accidental === '#' ? 'F#' : 'Gb'
      case 8:
        return 'G'
      case 9:
        return accidental === '#' ? 'G#' : 'Ab'
      case 10:
        return 'A'
      case 11:
        return accidental === '#' ? 'A#' : 'Bb'
      case 12:
        return 'B'
      default:
        throw new Error('Invalid note number')
    }
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
}

export default MusicalUtil
