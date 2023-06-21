import { ChordType, NoteDegree } from '../customTypes/musicalTypes'

type ChordStructure = {
  noteNumbers: number[]
  noteDegrees: NoteDegree[]
}
type ChordTypeMap = { [key in ChordType]: ChordStructure }

class Constants {
  static readonly SCALE = {
    MAJOR_SCALSE: [1, 3, 5, 6, 8, 10, 12],
  }

  private static readonly CHORD_STRUCTURE_MAP: ChordTypeMap = {
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

  static getNotesInChordNumber(chordType: ChordType): number[] {
    return this.CHORD_STRUCTURE_MAP[`${chordType}`].noteNumbers
  }

  static getNotesInChordDegree(chordType: ChordType): NoteDegree[] {
    return this.CHORD_STRUCTURE_MAP[`${chordType}`].noteDegrees
  }
}

export default Constants
