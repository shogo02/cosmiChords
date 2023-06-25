import SynthService from '../../services/SynthService'
import TransportService from '../../services/TransportService'
import SynthCreator from '../../utils/SynthCreator'
import PcKeyHandler from './PcKeyHandler'
import MidiKeyHandler from './MidiKeyHandler'
import mu from '../../utils/MusicalUtil'

class InputController {
  private synthService: SynthService

  private pcKeyService: PcKeyHandler

  private midiKeyService: MidiKeyHandler

  private pcKeyOctobe = 0

  private constructor(synthService: SynthService, pcKeyService: PcKeyHandler, midiKeyService: MidiKeyHandler) {
    this.synthService = synthService
    this.pcKeyService = pcKeyService
    this.midiKeyService = midiKeyService
  }

  static createInputController() {
    const synthService = new SynthService(SynthCreator.createPolySynth())
    const inputController = new InputController(synthService, new PcKeyHandler(), new MidiKeyHandler())
    return inputController
  }

  setPcKeyOctobe(octobe: number) {
    this.pcKeyOctobe = octobe
  }

  init() {
    this.initPcKeyAction()
    this.pcKeyService.init()
  }

  private initPcKeyAction() {
    this.pcKeyService.setKeySpaceAction(() => {
      TransportService.toggleTransport()
      console.log('KeyDown: space')
    })

    this.pcKeyService.setNormalKeyDownAction((midiNumber: number) => {
      const noteName = mu.getNoteFromMidiNumber(midiNumber, this.pcKeyOctobe) // TODO 後々オクターブを可変にする
      this.synthService.noteOn(noteName)
      console.log(`KeyDown: ${noteName}`)
    })

    this.pcKeyService.setNormalKeyUpAction((midiNumber: number) => {
      const noteName = mu.getNoteFromMidiNumber(midiNumber, this.pcKeyOctobe)
      this.synthService.noteOff(noteName)
      console.log(`KeyUp: ${noteName}`)
    })
  }
}

export default InputController
