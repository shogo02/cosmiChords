import { useEffect, useState } from 'react'
import Note from '../models/Note'

type PianoKeyProps = {
  midiNumber: number
  noteName: string | undefined
  isPressed: boolean
  isBlackKey: boolean
}

type PianoKeyboardProps = {
  activeNote: Note[]
}

const useCountOfVisibleWhiteKeys = (): number => {
  const calculateWhiteKeys = (width: number): number => Math.floor(width / 40)
  const [visibleWhiteKeys, setVisibleWhiteKeys] = useState<number>(calculateWhiteKeys(window.innerWidth))

  useEffect(() => {
    const updateVisibleWhiteKeys = () => setVisibleWhiteKeys(calculateWhiteKeys(window.innerWidth))
    window.addEventListener('resize', updateVisibleWhiteKeys)
    return () => window.removeEventListener('resize', updateVisibleWhiteKeys)
  }, [])

  return visibleWhiteKeys
}

function PianoKey({ midiNumber, noteName, isPressed, isBlackKey }: PianoKeyProps) {
  const whiteKeyClassNames = 'relative h-full w-10 border border-black flex flex-col items-center rounded-b-lg'
  const blackKeyClassNames =
    'absolute h-20 w-7 mx-[-14px] bg-slate-600 z-10 border border-black flex flex-col items-center rounded-b-lg'

  const keyClassNames = isBlackKey ? blackKeyClassNames : whiteKeyClassNames
  const additionalClass = isPressed ? 'bg-sky-600' : ''

  const textClassNames = isBlackKey ? 'text-white' : 'text-black'

  return (
    <div className={isBlackKey ? 'col-span-1' : 'col-span-1'}>
      <div className={keyClassNames}>
        <div className={`${additionalClass} w-full h-full flex justify-center ${textClassNames}`}>
          <div className="mt-auto">{isPressed ? noteName : midiNumber}</div>
        </div>
      </div>
    </div>
  )
}

function Keyboard({ activeNote }: PianoKeyboardProps) {
  const visibleWhiteKeys = useCountOfVisibleWhiteKeys()
  const maxVisibleKeys = visibleWhiteKeys + Math.floor(visibleWhiteKeys / 7) * 5

  let initialMidiNumber = Math.max(60 - Math.floor(maxVisibleKeys / 2), 0)
  const blackKeyPattern = [1, 3, 6, 8, 10]

  while (blackKeyPattern.includes(initialMidiNumber % 12)) {
    initialMidiNumber += 1
  }

  const midiNumbers = []
  for (let i = 0; i < maxVisibleKeys && initialMidiNumber + i <= 127; i += 1) {
    midiNumbers.push(initialMidiNumber + i)
  }

  const isBlackKey = (midiNumber: number): boolean => blackKeyPattern.includes(midiNumber % 12)

  return (
    <div className="h-full flex justify-center">
      <div className="flex justify-center">
        {midiNumbers.map((midiNumber) => {
          const targetActiveNote = activeNote.find((note) => note.midiNumber === midiNumber)
          return (
            <PianoKey
              key={midiNumber}
              midiNumber={midiNumber}
              noteName={targetActiveNote?.noteName}
              isPressed={!!targetActiveNote}
              isBlackKey={isBlackKey(midiNumber)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Keyboard
