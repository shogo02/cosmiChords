import { Accidental, DiatonicKeyType } from '../customTypes/musicalTypes'

class GameSettings {
  private _selectedDiatonic: DiatonicKeyType

  private _accidental: Accidental

  constructor(selectedDiatonic: DiatonicKeyType, accidental: Accidental) {
    this._selectedDiatonic = selectedDiatonic
    this._accidental = accidental
  }

  get selectedDiatonic(): DiatonicKeyType {
    return this._selectedDiatonic
  }

  set selectedDiatonic(selectedDiatonic: DiatonicKeyType) {
    this._selectedDiatonic = selectedDiatonic
  }

  get accidental(): Accidental {
    return this._accidental
  }

  set accidental(accidental: Accidental) {
    this._accidental = accidental
  }
}

export default GameSettings
