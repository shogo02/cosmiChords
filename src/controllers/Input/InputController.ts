import SynthService from '../../services/SynthService'
import TransportService from '../../services/TransportService'
import SynthCreator from '../../utils/SynthCreator'
import PcKeyHandler from './PcKeyHandler'
import MidiKeyHandler from './MidiKeyHandler'
import Note from '../../models/Note'
import { GameSetting } from '../../models/GameSettings'
import { GameState } from '../../models/GameStates'

export type NoteAction = (midinumber: number) => void

class InputController {
  private synthService: SynthService

  private pcKeyHandler: PcKeyHandler

  private midiKeyHandler: MidiKeyHandler

  private gameSettings?: GameSetting

  private gameStates?: GameState

  private constructor(synthService: SynthService, pcKeyService: PcKeyHandler, midiKeyService: MidiKeyHandler) {
    this.synthService = synthService
    this.pcKeyHandler = pcKeyService
    this.midiKeyHandler = midiKeyService
  }

  static createInputController() {
    const synthService = new SynthService(SynthCreator.createPolySynth())
    const inputController = new InputController(synthService, new PcKeyHandler(), new MidiKeyHandler())
    return inputController
  }

  init(gameSetting: GameSetting, gameStates: GameState) {
    this.gameSettings = gameSetting
    this.gameStates = gameStates
    this.initPcKeyAction()
    this.initMidiKeyboardAction()
    this.pcKeyHandler.init()
    this.midiKeyHandler.init(this.gameSettings.addMidiDevice, this.gameSettings.removeMidiDevice)
  }

  private initPcKeyAction() {
    this.pcKeyHandler.setKeySpaceAction(() => {
      TransportService.toggleTransport()
    })

    this.pcKeyHandler.setNormalKeyDownAction((midiNumber: number) => {
      const note = new Note(midiNumber, this.gameSettings?.accidental).getTransposeNote(0, 4)
      this.noteOn(note)
    })

    this.pcKeyHandler.setNormalKeyUpAction((midiNumber: number) => {
      const note = new Note(midiNumber, this.gameSettings?.accidental).getTransposeNote(0, 4)
      this.noteOff(note)
    })
  }

  private initMidiKeyboardAction() {
    this.midiKeyHandler.setNoteAction(
      (midiNumber: number) => {
        const note = new Note(midiNumber)
        this.noteOn(note)
      },
      (midiNumber: number) => {
        const note = new Note(midiNumber)
        this.noteOff(note)
      }
    )
  }

  noteOn = (note: Note) => {
    this.synthService.noteOn(note.identifier)
    this.gameStates?.addActiveNote(note)
  }

  noteOff = (note: Note) => {
    this.synthService.noteOff(note.identifier)
    this.gameStates?.removeActiveNote(note)
  }
}

export default InputController
