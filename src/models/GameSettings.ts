import { AccidentalType, DiatonicType } from '../customTypes/musicalTypes'
import Accidental from './Accidental'

class GameSettings {
  private _diatonicKey: number

  private _diatonicType: DiatonicType

  private _accidental: Accidental

  private _pianoOctobe: number

  constructor(diatonicKey: number, diatonicType: DiatonicType, accidental: AccidentalType, pianoOctobe: number) {
    GameSettings.validate(diatonicKey, pianoOctobe)
    this._diatonicKey = diatonicKey
    this._diatonicType = diatonicType
    this._accidental = new Accidental(accidental)
    this._pianoOctobe = pianoOctobe
  }

  get diatonicKey(): number {
    return this._diatonicKey
  }

  set diatonicKey(diatonicKey: number) {
    GameSettings.validateDiatonicKey(diatonicKey)
    this._diatonicKey = diatonicKey
  }

  get diatonicType(): DiatonicType {
    return this._diatonicType
  }

  set diatonicType(diatonicType: DiatonicType) {
    this._diatonicType = diatonicType
  }

  get accidental(): Accidental {
    return this._accidental
  }

  get pianoOctobe(): number {
    return this._pianoOctobe
  }

  set pianoOctobe(pianoOctobe: number) {
    GameSettings.validateOctobe(pianoOctobe)
    this._pianoOctobe = pianoOctobe
  }

  private static validate(diatonicKey: number, pianoOctobe: number) {
    this.validateDiatonicKey(diatonicKey)
    this.validateOctobe(pianoOctobe)
  }

  private static validateDiatonicKey(diatonicKey: number): void {
    if (diatonicKey < 1 || diatonicKey > 12) {
      throw new Error('Number value must be between 1 and 12')
    }
  }

  private static validateOctobe(pianoOctobe: number) {
    if (pianoOctobe < 0 || pianoOctobe > 9) {
      throw new Error('Number value must be between 0 and 9')
    }
  }
}

export default GameSettings
