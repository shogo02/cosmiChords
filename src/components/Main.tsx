import React, { useEffect } from 'react'
import abcjs from 'abcjs'
import Chord from '../models/Chord'
import Note from '../models/Note'
import { DiatonicKey } from '../customTypes/musicalTypes'

type MainProp = {
  chord: Chord
  activeNote: Note[]
  diatonicKeyName: DiatonicKey
}

type ScoreProps = {
  abcNotaion: string[]
  diatonicKeyName: DiatonicKey
}

function Score({ abcNotaion, diatonicKeyName }: ScoreProps) {
  useEffect(() => {
    abcjs.renderAbc(
      'abcjs',
      `K:${diatonicKeyName}
      L:1/4
      [${abcNotaion.join('')}]`,
      {
        paddingtop: 10,
        paddingbottom: 10,
        paddingleft: 80,
        paddingright: 80,
        staffwidth: 147,
      }
    )
  }, [abcNotaion, diatonicKeyName])

  return <div id="abcjs" className="" />
}

const Main = React.memo(({ chord, activeNote, diatonicKeyName }: MainProp) => (
  <div className="border border-black h-full bg-[#000730] text-cyan-200 p-4 flex flex-col items-center">
    <div className="text-4xl">1</div>
    <div className="text-6xl text-center">{chord.chordName}</div>
    <div className="text-4xl text-center">{chord.noteNames.join(' ')}</div>
    <div className="text-3xl text-center">{chord.noteDegrees.join(' ')}</div>
    <div className="text-3xl text-center">{chord.noteNumbers.join(' ')}</div>
    <Score abcNotaion={chord.abcNotation} diatonicKeyName={diatonicKeyName} />
    <div className="text-3xl text-center">
      {activeNote
        .sort((a, b) => a.midiNumber - b.midiNumber)
        .map((e) => e.noteName)
        .join(' ')}
    </div>
    {/* <sub>7</sub><sup>(-5)</sup> */}
    {/* &#9837;	&#9839; */}
  </div>
))

export default Main
