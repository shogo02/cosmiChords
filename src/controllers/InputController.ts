import MidiKeyService from '../services/MidiKeyService'
import PcKeyService from '../services/PcKeyService'
import SynthService from '../services/SynthService'
import TransportService from '../services/TransportService'
import SynthCreator from '../utils/SynthCreator'

class InputController {
  private synthService: SynthService

  private pcKeyService: PcKeyService

  private midiKeyService: MidiKeyService

  private constructor(synthService: SynthService, pcKeyService: PcKeyService, midiKeyService: MidiKeyService) {
    this.synthService = synthService
    this.pcKeyService = pcKeyService
    this.midiKeyService = midiKeyService
  }

  static createInputController() {
    const synthService = new SynthService(SynthCreator.createPolySynth())
    const inputController = new InputController(synthService, new PcKeyService(), new MidiKeyService())
    return inputController
  }

  init() {
    this.initPcKeyAction()
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
