import { Accidental, BaseNoteNumber, ChordType } from '../customTypes/musicalTypes'
import Chord from '../models/Chord'

type TestChord = {
  rootNumber: BaseNoteNumber
  chordType: ChordType
  accidental: Accidental
  tobe: {
    chordName: string
    noteNames: string[]
  }
}
const testChord: TestChord[] = [
  {
    rootNumber: 1,
    chordType: '',
    accidental: '',
    tobe: { chordName: 'C', noteNames: ['C', 'E', 'G'] },
  },
  {
    rootNumber: 1,
    chordType: 'm',
    accidental: '',
    tobe: { chordName: 'Cm', noteNames: ['C', 'Eb', 'G'] },
  },
  {
    rootNumber: 2,
    chordType: 'm7b5',
    accidental: '',
    tobe: { chordName: 'Dbm7b5', noteNames: ['Db', 'E', 'G', 'B'] },
  },
  {
    rootNumber: 6,
    chordType: 'dim7',
    accidental: '#',
    tobe: { chordName: 'Fdim7', noteNames: ['F', 'G#', 'B', 'D#'] },
  },
]

testChord.forEach((tc, index) => {
  test(`index: ${index}`, () => {
    const chord = new Chord(tc.rootNumber, tc.chordType, tc.accidental)
    expect(chord.chordName).toBe(tc.tobe.chordName)
    expect(chord.noteNames).toEqual(tc.tobe.noteNames)
  })
})
