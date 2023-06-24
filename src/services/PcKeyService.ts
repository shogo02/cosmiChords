import Constants from '../constants/constants'

const { PC_KEY, MIDI_NUMBER_TO_NAME } = Constants

class PcKeyService {
  private pressingKey: Array<string> = []

  private keySpaceAction: (() => void) | undefined

  private normalKeyDownAction: ((key: string) => void) | undefined

  private normalKeyUpAction: ((key: string) => void) | undefined

  private octobe?: number

  constructor() {
    document.addEventListener('keydown', (event) => this.keyDownHanler(event))
    document.addEventListener('keyup', (event) => this.keyUpHanler(event))
  }

  private keyDownHanler = ({ key }: KeyboardEvent) => {
    if (this.pressingKey.includes(key)) return
    if (key === ' ') {
      this.keyDownSpace()
    } else if (PC_KEY.flatMap((e) => e).includes(key)) {
      this.keyDownNormal(key)
    }
    this.pressingKey.push(key)
  }

  private keyUpHanler = (event: KeyboardEvent) => {
    if (PC_KEY.flatMap((e) => e).includes(event.key)) {
      this.keyUpNormal(event.key)
    }
    this.pressingKey = this.pressingKey.filter((e) => e !== event.key)
  }

  private keyDownSpace() {
    this.keySpaceAction?.()
  }

  private keyDownNormal(key: string) {
    const midiNumber = PcKeyService.getMidiNumberFromPcKey(key, this.octobe ?? 4) // TODO ??4を後でなんとかする
    this.normalKeyDownAction?.(midiNumber)
  }

  private keyUpNormal(key: string) {
    const midiNumber = PcKeyService.getMidiNumberFromPcKey(key, this.octobe ?? 4) // TODO ??4を後でなんとかする
    this.normalKeyUpAction?.(midiNumber)
  }

  setKeySpaceAction(keyAction: () => void) {
    this.keySpaceAction = keyAction
  }

  setNormalKeyDownAction(keyAction: (key: string) => void) {
    this.normalKeyDownAction = keyAction
  }

  setNormalKeyUpAction(keyAction: (key: string) => void) {
    this.normalKeyUpAction = keyAction
  }

  /**
   * PCキー入力からNoteNumberを取定する
   */
  private static getMidiNumberFromPcKey(key: string, octobe: number) {
    if (octobe < 0 || octobe > 9 || !Number.isInteger(octobe)) {
      throw new Error(`Invalid octobe: ${octobe}`)
    }

    const offSet = octobe * 12
    let index = PC_KEY[0].findIndex((value) => value === key)
    if (index >= 0) {
      return MIDI_NUMBER_TO_NAME[index + offSet + 12]
    }

    index = PC_KEY[1].findIndex((value) => value === key)
    if (index >= 0) {
      return MIDI_NUMBER_TO_NAME[index + offSet]
    }
    throw new Error(`Invalid PCkey: ${key}`)
  }
}

export default PcKeyService
