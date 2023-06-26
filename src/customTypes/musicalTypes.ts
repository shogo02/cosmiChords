export type AccidentalType = '' | '#' | 'b'
export type NoteDegree =
  | 'R'
  | 'm2'
  | 'M2'
  | 'm3'
  | 'M3'
  | 'P4'
  | 'aug4'
  | 'b5'
  | 'P5'
  | '#5'
  | 'm6'
  | 'M6'
  | 'm7'
  | 'M7'
  | 'b9'
  | '9'
  | '#9'
  | '11'
  | '#11'
  | 'b13'
  | '13'
export type NaturalNoteName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type SharpNoteName = 'C#' | 'D#' | 'E#' | 'F#' | 'G#' | 'A#' | 'B#'
export type FlatNoteName = 'Cb' | 'Db' | 'Eb' | 'Fb' | 'Gb' | 'Ab' | 'Bb'
export type NoteName = NaturalNoteName | SharpNoteName | FlatNoteName
export type ChordType =
  | ''
  | 'm'
  | '5'
  | 'mb5'
  | 'dim'
  | 'aug'
  | 'sus2'
  | 'sus4'
  | '6'
  | 'm6'
  | '7'
  | 'M7'
  | 'm7'
  | 'aug7'
  | 'dim7'
  | '7b5'
  | '7#5'
  | 'm7b5'
  | 'm7#5'
export type DiatonicKey = 'C' | 'G' | 'D' | 'A' | 'E' | 'B' | 'F#' | 'Db' | 'Ab' | 'Eb' | 'Bb' | 'F'
export type DiatonicType = '3note' | '4note'
