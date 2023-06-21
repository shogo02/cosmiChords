import { Accidental, DiatonicType } from '../customTypes/musicalTypes'

class GameSettings {
  private _diatonicKey: number

  private _diatonicType: DiatonicType

  private _accidental: Accidental

  constructor(diatonicKey: number, diatonicType: DiatonicType, accidental: Accidental) {
    GameSettings.validateDiatonicKey(diatonicKey)
    this._diatonicKey = diatonicKey
    this._diatonicType = diatonicType
    this._accidental = accidental
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

  set accidental(accidental: Accidental) {
    this._accidental = accidental
  }

  // eslint-disable-next-line class-methods-use-this
  private static validateDiatonicKey(diatonicKey: number): void {
    if (diatonicKey < 1 || diatonicKey > 12) {
      throw new Error('Number value must be between 1 and 12')
    }
  }
}

export default GameSettings
