const PC_KEY = [
  ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', ',', 'l', '.', ';', '/', '_', ']'],
  ['q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u', 'i', '9', 'o', '0', 'p', '@', '^', '[', '¥'],

  // "a", "z", "s", "x", "d", "c", "f", "v", "g", "b", "h", "n", "j", "m", "k", ",", "l", ".", ";", "/", ":", "_", "]",
  // "1", "q", "2", "w", "3", "e", "4", "r", "5", "t", "6", "y", "7", "u", "8", "i", "9", "o", "0", "p", "-", "@", "^",
]

class PcKeyService {
  private pressingKey: Array<string> = []

  private keySpaceAction: (() => void) | undefined

  private normalKeyDownAction: ((key: string) => void) | undefined

  private normalKeyUpAction: ((key: string) => void) | undefined

  private keyDownHanler = (event: KeyboardEvent) => {
    if (this.pressingKey.includes(event.key)) return
    if (event.key === ' ') {
      this.keySpaceAction?.()
    } else if (PC_KEY.flatMap((e) => e).includes(event.key)) {
      this.normalKeyDownAction?.(event.key)
    }
    this.pressingKey.push(event.key)
  }

  private keyUpHanler = (event: KeyboardEvent) => {
    if (PC_KEY.flatMap((e) => e).includes(event.key)) {
      this.normalKeyUpAction?.(event.key)
    }
    this.pressingKey = this.pressingKey.filter((e) => e !== event.key)
  }

  setKeySpaceAction(keyAction: () => void) {
    this.keySpaceAction = keyAction
  }

  setNormalKeyDownAction(keyAction: (key: string) => void) {
    this.normalKeyDownAction = keyAction
  }

  setNormalUpDownAction(keyAction: (key: string) => void) {
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
