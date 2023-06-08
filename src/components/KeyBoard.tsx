import { useSnapshot } from 'valtio'
import { Note } from 'webmidi'
import { Constants } from '../constants/constants'

type KeyProps = {
  midiNumber: number
  pcKey: string
}

// TODO 白鍵黒鍵に分けたい
function Key(props: KeyProps) {
  const { midiNumber, pcKey } = props
  let addClassName = ''
  if (Constants.MIDI_HALF_NOTE_NUMBER.find((e) => e === midiNumber)) {
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
  const keyboardOctobe = 0;
  const offSet = Constants.KEYBOARD_OFFSET + keyboardOctobe * 12
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
