import {
  Accidental,
  NoteNumber,
  ChordType,
  NoteDegree,
  NoteName,
  BaseNoteNumber,
  DiatonicType,
} from '../customTypes/musicalTypes'

type ChordStructure = {
  noteNumbers: NoteNumber[]
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

const MAJOR_SCALE = [1, 3, 5, 6, 8, 10, 12]

class MusicalUtil {
  private static fixeNoteNumber(noteNumber: NoteNumber): BaseNoteNumber {
    return (noteNumber > 12 ? noteNumber - 12 : noteNumber) as BaseNoteNumber
  }

  private static getNoteName(noteNumber: NoteNumber, accidental: Accidental): NoteName {
    if (noteNumber === 1 || noteNumber === 13) return 'C'
    if (noteNumber === 2 || noteNumber === 14) return accidental === '#' ? 'C#' : 'Db'
    if (noteNumber === 3 || noteNumber === 15) return 'D'
    if (noteNumber === 4 || noteNumber === 16) return accidental === '#' ? 'D#' : 'Eb'
    if (noteNumber === 5 || noteNumber === 17) return 'E'
    if (noteNumber === 6 || noteNumber === 18) return 'F'
    if (noteNumber === 7 || noteNumber === 19) return accidental === '#' ? 'F#' : 'Gb'
    if (noteNumber === 8 || noteNumber === 20) return 'G'
    if (noteNumber === 9 || noteNumber === 21) return accidental === '#' ? 'G#' : 'Ab'
    if (noteNumber === 10 || noteNumber === 22) return 'A'
    if (noteNumber === 11 || noteNumber === 23) return accidental === '#' ? 'A#' : 'Bb'
    if (noteNumber === 12 || noteNumber === 24) return 'B'
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

  static getNoteNamesInChord(rootNumber: NoteNumber, chordType: ChordType, accidental: Accidental) {
    const notesInChordNumber = MusicalUtil.getNotesInChordNumber(chordType)
    const noteNamesInChord: NoteName[] = []
    notesInChordNumber.forEach((noteNumber) => {
      const calcNoteNumber = MusicalUtil.fixeNoteNumber((rootNumber + noteNumber - 1) as NoteNumber)
      const noteName = MusicalUtil.noteNumberToName(calcNoteNumber, accidental)
      noteNamesInChord.push(noteName)
    })
    return noteNamesInChord
  }

  static getChordTypeFromDegreeNum(degree: number, type: DiatonicType): ChordType {
    if (degree === 1) return type === '3note' ? '' : 'M7'
    if (degree === 2) return type === '3note' ? 'm' : 'm7'
    if (degree === 3) return type === '3note' ? 'm' : 'm7'
    if (degree === 4) return type === '3note' ? '' : 'M7'
    if (degree === 5) return type === '3note' ? '' : 'M7'
    if (degree === 6) return type === '3note' ? 'm' : 'm7'
    if (degree === 7) return type === '3note' ? 'mb5' : 'm7b5'
    throw new Error(`Invalid degree: ${degree}`)
  }

  static getMajorScale() {
    return MAJOR_SCALE
  }
}

export default MusicalUtil
