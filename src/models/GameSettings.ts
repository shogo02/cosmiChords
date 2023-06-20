import { Accidental, BaseNoteNumber, DiatonicType } from '../customTypes/musicalTypes'

class GameSettings {
  private _diatonicKey: BaseNoteNumber

  private _diatonicType: DiatonicType

  private _accidental: Accidental

  constructor(diatonicKey: BaseNoteNumber, diatonicType: DiatonicType, accidental: Accidental) {
    this._diatonicKey = diatonicKey
    this._diatonicType = diatonicType
    this._accidental = accidental
  }

  get diatonicKey(): BaseNoteNumber {
    return this._diatonicKey
  }

  set diatonicKey(diatonicKey: BaseNoteNumber) {
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
}

export default GameSettings
