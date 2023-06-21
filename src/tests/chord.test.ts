import { Accidental, ChordType } from '../customTypes/musicalTypes'
import Chord from '../models/Chord'

type TestChord = {
  rootNumber: number
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
  {
    rootNumber: 12,
    chordType: '7',
    accidental: '',
    tobe: { chordName: 'B7', noteNames: ['B', 'Eb', 'Gb', 'A'] },
  },
  {
    rootNumber: 1,
    chordType: 'M7',
    accidental: '',
    tobe: { chordName: 'CM7', noteNames: ['C', 'E', 'G', 'B'] },
  },
  {
    rootNumber: 11,
    chordType: 'm7b5',
    accidental: 'b',
    tobe: { chordName: 'Bbm7b5', noteNames: ['Bb', 'Db', 'E', 'Ab'] },
  },
]

testChord.forEach((tc, index) => {
  test(`index: ${index}`, () => {
    const chord = new Chord(tc.rootNumber, tc.chordType, tc.accidental)
    expect(chord.chordName).toBe(tc.tobe.chordName)
    expect(chord.noteNames).toEqual(tc.tobe.noteNames)
  })
})
