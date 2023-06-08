import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { Note } from 'webmidi'
import Score from './Score'

function Main() {
  return (
    <div className="border border-black h-full bg-[#000730] text-cyan-200 p-4 flex flex-col items-center">
      <div className="text-4xl">1</div>
      <div className="text-6xl text-center">Cmaj7</div>
      <div className="text-4xl text-center">C E G B</div>
      <div className="text-3xl text-center">1 3 5 7</div>
      <Score />
      <div className="text-3xl text-center">C</div>
      {/* <sub>7</sub><sup>(-5)</sup> */}
      {/* &#9837;	&#9839; */}
    </div>
  )
}

export default Main
