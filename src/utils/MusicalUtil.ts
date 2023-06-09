import { Accidental, NoteNumber, ChordType, ChordTypeMap, NaturalNoteName, NoteDegree, NoteName, BaseNoteNumber } from "../constants/type";



const NATURAL_NOTE: NoteName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const CHORD_STRUCTURE_MAP: ChordTypeMap = {
    '': { noteNumbers: [1, 5, 8], noteDegrees: ['R', 'P5', 'M3'] },
    'm': { noteNumbers: [1, 4, 8], noteDegrees: ['R', 'm3', 'P5'] },
    '5': { noteNumbers: [1, 8], noteDegrees: ['R', 'P5'] },
    'dim': { noteNumbers: [1, 4, 7], noteDegrees: ['R', 'm3', 'b5'] },
    'aug': { noteNumbers: [1, 5, 9], noteDegrees: ['R', 'P5', '#5'] },
    'sus2': { noteNumbers: [1, 3, 8], noteDegrees: ['R', 'M2', 'P5'] },
    'sus4': { noteNumbers: [1, 6, 8], noteDegrees: ['R', 'P4', 'P5'] },
    '6': { noteNumbers: [1, 5, 8, 10], noteDegrees: ['R', 'M3', 'P5', 'M6'] },
    'm6': { noteNumbers: [1, 4, 8, 10], noteDegrees: ['R', 'm3', 'P5', 'M6'] },
    '7': { noteNumbers: [1, 5, 8, 11], noteDegrees: ['R', 'M3', 'P5', 'm7'] },
    'M7': { noteNumbers: [1, 5, 8, 12], noteDegrees: ['R', 'M3', 'P5', 'M7'] },
    'm7': { noteNumbers: [1, 4, 8, 11], noteDegrees: ['R', 'm3', 'P5', 'm7'] },
    'aug7': { noteNumbers: [1, 5, 9, 11], noteDegrees: ['R', 'P5', '#5', 'm7'] },
    'dim7': { noteNumbers: [1, 4, 7, 11], noteDegrees: ['R', 'm3', 'b5', 'm7'] },
    '7b5': { noteNumbers: [1, 5, 7, 11], noteDegrees: ['R', 'M3', 'b5', 'm7'] },
    '7#5': { noteNumbers: [1, 5, 9, 11], noteDegrees: ['R', 'M3', '#5', 'm7'] },
    'm7b5': { noteNumbers: [1, 4, 7, 11], noteDegrees: ['R', 'm3', 'b5', 'm7'] },
    'm7#5': { noteNumbers: [1, 4, 9, 11], noteDegrees: ['R', 'm3', '#5', 'm7'] },
}

class MusicalUtil {
    static noteNumberToName(noteNumber: NoteNumber, accidental: Accidental): NoteName {
        const fixedNoteNumber = noteNumber > 12 ? noteNumber - 12 : noteNumber
        
        if([2, 4, 7, 9, 11].includes(noteNumber)) {
            if (accidental === '#') return `${NATURAL_NOTE[fixedNoteNumber - 1]}#` as NoteName
            if (accidental === 'b') return `${NATURAL_NOTE[fixedNoteNumber + 1]}b` as NoteName
        }
        console.log(fixedNoteNumber)
        return NATURAL_NOTE[fixedNoteNumber - 1]
    }

    static getNotesInChordNumber(chordType: ChordType): NoteNumber[] {
        return CHORD_STRUCTURE_MAP[`${chordType}`].noteNumbers;
    }

    static getNotesInChordDegree(chordType: ChordType): NoteDegree[] {
        return CHORD_STRUCTURE_MAP[`${chordType}`].noteDegrees;
    }

    static getNoteNamesInChord(rootNumber: BaseNoteNumber, chordType: ChordType, accidental: Accidental) {
        const notesInChordNumber = MusicalUtil.getNotesInChordNumber(chordType)
        const noteNamesInChord: NoteName[] = []
        notesInChordNumber.forEach((noteNumber, index) => {
            const calcNoteNumber = (rootNumber + noteNumber - 1) as BaseNoteNumber
            const noteName = MusicalUtil.noteNumberToName(calcNoteNumber, accidental)
            console.log(noteName)
            noteNamesInChord.push(noteName)
        })
        return noteNamesInChord
    }
}

export default MusicalUtil