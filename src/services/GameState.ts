import { Accidental, DiatonicType } from "../customTypes/musicalTypes";

class GameState {
    private _selectedDiatonic: DiatonicType

    private _accidental: Accidental

    constructor(selectedDiatonic: DiatonicType, accidental: Accidental) {
        this._selectedDiatonic = selectedDiatonic
        this._accidental = accidental
    }

    get selectedDiatonic(): DiatonicType {
        return this._selectedDiatonic
    }

    set selectedDiatonic(selectedDiatonic: DiatonicType) {
        this._selectedDiatonic = selectedDiatonic
    }

    get accidental(): Accidental {
        return this._accidental
    }

    set accidental(accidental: Accidental) {
        this._accidental = accidental
    }
}

export default GameState;