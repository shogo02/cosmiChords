import SynthCreator from '../utils/SynthCreator'
import ChordGenerator from './ChordGenerator'
import GameSettings from '../models/GameSettings'
import TransportService, { Pattern } from './TransportService'
import GameStates from '../models/GameStates'
import Chord from '../models/Chord'
import InputController from '../controllers/Input/InputController'

const METRONOME_PATTERN: Pattern = [
  { time: 0, note: 'C6', velocity: 1 },
  { time: '0:1', note: 'C5', velocity: 1 },
  { time: '0:2', note: 'C5', velocity: 1 },
  { time: '0:3', note: 'C5', velocity: 1 },
]

class GameService {
  private chordGenerator: ChordGenerator // TODO 今のところインスタンスの使い道がない

  private gameSettings: GameSettings

  private gameStates: GameStates

  private transportService?: TransportService

  private inputController: InputController

  // TODO ↓やり方考える
  public setChordView: React.Dispatch<React.SetStateAction<Chord | undefined>> | undefined

  private constructor(
    chordGenerator: ChordGenerator,
    gameSettings: GameSettings,
    gameStates: GameStates,
    inputController: InputController
  ) {
    this.chordGenerator = chordGenerator
    this.gameSettings = gameSettings
    this.gameStates = gameStates
    this.inputController = inputController
  }

  static createGameService() {
    const gameSettings = new GameSettings(7, '3note', 'b', 5)
    const gameState = new GameStates()
    const chordGenerator = new ChordGenerator()
    const inputController = InputController.createInputController()
    return new GameService(chordGenerator, gameSettings, gameState, inputController)
  }

  init() {
    this.createPart()
    this.inputController.init()
  }

  gameStart() {
    this.generateChord()
    this.setChordView?.(this.gameStates.currentChord)
  }

  private createPart() {
    const draw = () => {
      this.generateChord()
      this.setChordView?.(this.gameStates.currentChord)
    }
    const synth = SynthCreator.createSynth()
    this.transportService = new TransportService(synth, METRONOME_PATTERN, draw)
    this.transportService.createPart()
  }

  private generateChord() {
    const { diatonicKey, diatonicType, accidental } = this.gameSettings
    this.chordGenerator.createDiatonicValidChords(diatonicKey, diatonicType, accidental.value)
    this.gameStates.currentChord = this.chordGenerator.getRandomChord()
  }
}

export default GameService
