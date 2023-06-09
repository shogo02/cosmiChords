import { Accidental, NoteNumber, ChordType, NoteDegree, NoteName, BaseNoteNumber } from "../customTypes/musicalTypes";
import mu from "../utils/MusicalUtil";

class Chord {
    private _rootNumber: BaseNoteNumber;

    private _chordType: ChordType;
    
    private _accidental: Accidental;

    constructor(rootNumber: BaseNoteNumber, chordType: ChordType, accidental: Accidental = '') {
        this._rootNumber = rootNumber;
        this._chordType = chordType;
        this._accidental = accidental;
    }

    get rootNumber(): BaseNoteNumber {
        return this._rootNumber;
    }

    get chordType(): ChordType {
        return this._chordType;
    }

    get accidental(): Accidental {
        return this._accidental;
    }

    set accidental(accidental: Accidental) {
        this._accidental = accidental;
    }

    get chordName(): string {
        return this.rootName + this.chordType;
    }

    get noteNumbers(): NoteNumber[] {
        return mu.getNotesInChordNumber(this.chordType);
    }

    get noteDegrees(): NoteDegree[] {
        return mu.getNotesInChordDegree(this.chordType);
    }

    get noteNames(): NoteName[] {
        return mu.getNoteNamesInChord(this.rootNumber, this.chordType, this.accidental);
    }

    get rootName(): NoteName {
        return mu.noteNumberToName(this.rootNumber, this.accidental);
    }
}

export default Chord