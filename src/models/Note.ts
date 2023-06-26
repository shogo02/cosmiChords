import { AccidentalType } from '../customTypes/musicalTypes'

class Note {
  private _midiNumber: number

  private _accdental: AccidentalType

  constructor(midiNumber: number, accidental: AccidentalType = '') {
    this._midiNumber = midiNumber
    this._accdental = accidental
  }

  get midiNumber(): number {
    return this._midiNumber
  }

  get noteName(): string {
    return this.midiNumberToNoteName()
  }

  get accidental(): AccidentalType {
    return this._accdental
  }

  get octave(): number {
    return Math.floor(this.midiNumber / 12)
  }

  get identifier(): string {
    return `${this.noteName}${this.octave}`
  }

  getTransposeNote(semitones = 0, octave = 0): Note {
    return new Note(this.midiNumber + semitones + octave * 12, this.accidental)
  }

  private midiNumberToNoteName(): string {
    const noteNames = [
      'C',
      this.isSharp() ? 'C#' : 'Db',
      'D',
      this.isSharp() ? 'D#' : 'Eb',
      'E',
      'F',
      this.isSharp() ? 'F#' : 'Gb',
      'G',
      this.isSharp() ? 'G#' : 'Ab',
      'A',
      this.isSharp() ? 'A#' : 'Bb',
      'B',
    ]
    return noteNames[this.midiNumber % 12]
  }

  private isSharp() {
    return this.accidental === '#'
  }
}

export default Note
