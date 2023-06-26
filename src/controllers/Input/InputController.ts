import SynthService from '../../services/SynthService'
import TransportService from '../../services/TransportService'
import SynthCreator from '../../utils/SynthCreator'
import PcKeyHandler from './PcKeyHandler'
import MidiKeyHandler from './MidiKeyHandler'
import Note from '../../models/Note'
import { GameSetting } from '../../models/GameSettings'
import { GameState } from '../../models/GameStates'

class InputController {
  private synthService: SynthService

  private pcKeyService: PcKeyHandler

  private midiKeyService: MidiKeyHandler

  private gameSettings?: GameSetting

  private gameStates?: GameState

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

  init(gameSetting: GameSetting, gameStates: GameState) {
    this.initPcKeyAction()
    this.pcKeyService.init()
    this.gameSettings = gameSetting
    this.gameStates = gameStates
  }

  private initPcKeyAction() {
    this.pcKeyService.setKeySpaceAction(() => {
      TransportService.toggleTransport()
    })

    this.pcKeyService.setNormalKeyDownAction((midiNumber: number) => {
      const note = new Note(midiNumber, this.gameSettings?.accidental).getTransposeNote(0, 4)
      this.noteOn(note)
    })

    this.pcKeyService.setNormalKeyUpAction((midiNumber: number) => {
      const note = new Note(midiNumber, this.gameSettings?.accidental).getTransposeNote(0, 4)
      this.noteOff(note)
    })
  }

  private noteOn(note: Note) {
    this.synthService.noteOn(note.identifier)
    this.gameStates?.addActiveNote(note)
  }

  private noteOff(note: Note) {
    this.synthService.noteOff(note.identifier)
    this.gameStates?.removeActiveNote(note)
  }
}

export default InputController
