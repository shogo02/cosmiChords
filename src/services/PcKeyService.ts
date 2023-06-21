import Constants from '../constants/constants'
import mu from '../utils/MusicalUtil'

const { PC_KEY } = Constants

class PcKeyService {
  private pressingKey: Array<string> = []

  private keySpaceAction: (() => void) | undefined

  private normalKeyDownAction: ((key: string) => void) | undefined

  private normalKeyUpAction: ((key: string) => void) | undefined

  private octobe: number

  constructor(octobe: number) {
    this.octobe = octobe
  }

  private keyDownHanler = (event: KeyboardEvent) => {
    if (this.pressingKey.includes(event.key)) return
    if (event.key === ' ') {
      this.keyDownSpace()
    } else if (PC_KEY.flatMap((e) => e).includes(event.key)) {
      this.keyDownNormal(event.key)
    }
    this.pressingKey.push(event.key)
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
    const midiNumber = mu.getNoteNumberFromPcKey(key, this.octobe)
    this.normalKeyDownAction?.(midiNumber)
  }

  private keyUpNormal(key: string) {
    const midiNumber = mu.getNoteNumberFromPcKey(key, this.octobe)
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

  getKeyDownHandler() {
    return this.keyDownHanler
  }

  getKeyUpHandler() {
    return this.keyUpHanler
  }
}

export default PcKeyService
