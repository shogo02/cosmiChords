import Constants from '../../constants/constants'

const { PC_KEY } = Constants

class PcKeyHandler {
  private pressingKey: Array<string> = []

  private keySpaceAction?: () => void

  private normalKeyDownAction?: (midinumber: number) => void

  private normalKeyUpAction?: (midinumber: number) => void

  init() {
    document.addEventListener('keydown', (event) => this.keyDownHanler(event))
    document.addEventListener('keyup', (event) => this.keyUpHanler(event))
  }

  private keyDownHanler = ({ key }: KeyboardEvent) => {
    if (this.pressingKey.includes(key)) return
    if (key === ' ') {
      this.keyDownSpace()
    } else if (PcKeyHandler.isValidPcKey(key)) {
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
    const midiNumber = PcKeyHandler.getMidiNumberFromPcKey(key)
    this.normalKeyDownAction?.(midiNumber)
  }

  private keyUpNormal(key: string) {
    const midiNumber = PcKeyHandler.getMidiNumberFromPcKey(key)
    this.normalKeyUpAction?.(midiNumber)
  }

  setKeySpaceAction(keyAction: () => void) {
    this.keySpaceAction = keyAction
  }

  setNormalKeyDownAction(keyAction: (midinumber: number) => void) {
    this.normalKeyDownAction = keyAction
  }

  setNormalKeyUpAction(keyAction: (midinumber: number) => void) {
    this.normalKeyUpAction = keyAction
  }

  /**
   * PCキー入力からNoteNumberを取定する
   */
  private static getMidiNumberFromPcKey(pcKey: string) {
    let index = PC_KEY[0].findIndex((value) => value === pcKey)
    if (index >= 0) {
      return index + 12
    }

    index = PC_KEY[1].findIndex((value) => value === pcKey)
    if (index >= 0) {
      return index
    }
    throw new Error(`Invalid PCkey: ${pcKey}`)
  }

  /**
   * 有効なPCキーかどうかを判定
   */
  private static isValidPcKey(key: string): boolean {
    return PC_KEY.flat().includes(key)
  }
}

export default PcKeyHandler
