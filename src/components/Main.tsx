import Chord from '../models/Chord'
import Score from './Score'

type Props = {
  chord: Chord | undefined
}

function Main({ chord }: Props) {
  return (
    <div className="border border-black h-full bg-[#000730] text-cyan-200 p-4 flex flex-col items-center">
      <div className="text-4xl">1</div>
      <div className="text-6xl text-center">{chord?.chordName}</div>
      {/* TODO ↓ここでエラーが起きる */}
      <div className="text-4xl text-center">{chord?.noteNames.join(' ')}</div>
      <div className="text-3xl text-center">{chord?.noteDegrees.join(' ')}</div>
      <div className="text-3xl text-center">{chord?.noteNumbers.join(' ')}</div>
      <Score />
      <div className="text-3xl text-center">C</div>
      {/* <sub>7</sub><sup>(-5)</sup> */}
      {/* &#9837;	&#9839; */}
    </div>
  )
}

export default Main
