import Score from './Score'
import gameStates from '../models/GameStates'

function Main() {
  const currentChord = gameStates((state) => state.currentChord)

  return (
    <div className="border border-black h-full bg-[#000730] text-cyan-200 p-4 flex flex-col items-center">
      <div className="text-4xl">1</div>
      <div className="text-6xl text-center">{currentChord.chordName}</div>
      <div className="text-4xl text-center">{currentChord.noteNames.join(' ')}</div>
      <div className="text-3xl text-center">{currentChord.noteDegrees.join(' ')}</div>
      <div className="text-3xl text-center">{currentChord.noteNumbers.join(' ')}</div>
      <Score />
      <div className="text-3xl text-center">C</div>
      {/* <sub>7</sub><sup>(-5)</sup> */}
      {/* &#9837;	&#9839; */}
    </div>
  )
}

export default Main
