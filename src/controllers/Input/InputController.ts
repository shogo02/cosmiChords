import SynthService from '../../services/SynthService'
import TransportService from '../../services/TransportService'
import SynthCreator from '../../utils/SynthCreator'
import PcKeyHandler from './PcKeyHandler'
import MidiKeyHandler from './MidiKeyHandler'

class InputController {
  private synthService: SynthService

  private pcKeyService: PcKeyHandler

  private midiKeyService: MidiKeyHandler

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

  init() {
    this.initPcKeyAction()
    this.pcKeyService.init()
  }

  private initPcKeyAction() {
    this.pcKeyService.setKeySpaceAction(() => {
      TransportService.toggleTransport()
      console.log('pressSpace')
    })

    this.pcKeyService.setNormalKeyDownAction((key: string) => {
      this.synthService.noteOn(key)
      console.log('key down')
    })

    this.pcKeyService.setNormalKeyUpAction((key: string) => {
      this.synthService.noteOff(key)
      console.log('key up')
    })
  }
}

export default InputController
