import { Constants } from '../constants/constants'

interface KeyProps {
  midiNumber: number
  pcKey: string
}

// TODO 白鍵黒鍵に分けたい
const Key: React.FunctionComponent<KeyProps> = (props: KeyProps) => {
  const { midiNumber, pcKey } = props
  const MIDI_HALF_NOTE_NUMBER = [
    1, 3, 6, 8, 10, 13, 15, 18, 20, 22, 25, 27, 30, 32, 34, 37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75,
    78, 80, 82, 85, 87, 90, 92, 94, 97, 99, 102, 104, 106, 109, 111, 114, 116, 118, 121, 123, 126,
  ]
  let addClassName = ''
  if (MIDI_HALF_NOTE_NUMBER.find((e) => e === midiNumber) != null) {
    addClassName += 'h-20 w-7 mx-[-14px] bg-slate-600 z-10 '
  } else {
    addClassName += 'h-36 w-10  '
  }

  return (
    <div className="flex">
      <div className={`${addClassName} border border-black flex justify-center items-end rounded-b-lg`}>
        <div className="p-2">
          {/* {displayNoteName}
          {pcKey ?? 'none'} */}
          {midiNumber}
        </div>
      </div>
    </div>
  )
}

function KeyBoard() {
  const KEYBOARD_OFFSET = 36
  const keyboardOctobe = 0
  const offSet = KEYBOARD_OFFSET + keyboardOctobe * 12
  const keyBoardMaxNumber = 48
  const keyArray = [...Array(keyBoardMaxNumber)].map((_, i) => i + offSet)

  return (
    <div className="flex justify-center">
      <div className="h-36 w-3/4 flex justify-center">
        {keyArray.map((e) => (
          <div className="col-span-1" key={e}>
            <Key midiNumber={e} pcKey="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default KeyBoard
