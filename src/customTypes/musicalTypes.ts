export type Accidental = '' | '#' | 'b'
export type BaseNoteNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type NoteNumber = BaseNoteNumber | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
export type NoteDegree = 'R' | 'm2' | 'M2' | 'm3' | 'M3' | 'P4' | 'aug4' | 'b5' | 'P5' | '#5' | 'm6' | 'M6' | 'm7' | 'M7' | 
                         'b9' | '9' | '#9' | '11' | '#11' | 'b13' | '13'
export type NaturalNoteName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type AlteredNoteName = 'C#' | 'Cb' | 'D#' | 'Db' | 'E#' | 'Eb' | 'F#' | 'Fb' | 'G#' | 'Gb' | 'A#' | 'Ab' | 'B#' | 'Bb'
export type NoteName = NaturalNoteName | AlteredNoteName
export type ChordType = '' | 'm' | '5' | 'dim' | 'aug' | 'sus2' | 'sus4' | '6' | 'm6' | '7' | 'M7' | 'm7' | 'aug7' | 'dim7' | '7b5' | '7#5' | 'm7b5' | 'm7#5'
export type DiatonicType = 'C' | 'G' | 'D' | 'A' | 'E' | 'B' | 'F#' | 'Gb' | 'Db' | 'Ab' | 'Eb' | 'Bb' | 'F'