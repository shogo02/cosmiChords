import { AccidentalType } from '../customTypes/musicalTypes'

class Accidental {
  private _accidental: AccidentalType

  constructor(accidental: AccidentalType = 'b') {
    this._accidental = accidental
  }

  get value(): AccidentalType {
    return this._accidental
  }

  setSharp() {
    this._accidental = '#'
  }

  setFlat() {
    this._accidental = 'b'
  }

  isSharp(): boolean {
    return this._accidental === '#'
  }
}

export default Accidental
