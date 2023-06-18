import { Accidental, DiatonicKey } from '../customTypes/musicalTypes'

class GameSettings {
  private _diatonicKey: DiatonicKey

  private _accidental: Accidental

  constructor(diatonicKey: DiatonicKey, accidental: Accidental) {
    this._diatonicKey = diatonicKey
    this._accidental = accidental
  }

  get diatonicKey(): DiatonicKey {
    return this._diatonicKey
  }

  set diatonicKey(diatonicKey: DiatonicKey) {
    this._diatonicKey = diatonicKey
  }

  get accidental(): Accidental {
    return this._accidental
  }

  set accidental(accidental: Accidental) {
    this._accidental = accidental
  }
}

export default GameSettings
