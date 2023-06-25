import InputController from '../controllers/Input/InputController'
import SynthCreator from '../utils/SynthCreator'
import GameService from './GameService'
import TransportService, { Pattern } from './TransportService'

class AppService {
  private gameService: GameService

  private inputController: InputController

  private constructor(gameService: GameService, inputController: InputController) {
    this.gameService = gameService
    this.inputController = inputController
  }

  static createAppservice() {
    const gameService = GameService.createGameService()
    const inputController = InputController.createInputController()
    return new AppService(gameService, inputController)
  }

  init() {
    // this.gameService.init()
    this.inputController.init()
    this.createPart()
  }

  start() {
    this.gameService.start()
  }

  private createPart() {
    const synth = SynthCreator.createSynth()
    const METRONOME_PATTERN: Pattern = [
      { time: 0, note: 'C6', velocity: 1 },
      { time: '0:1', note: 'C5', velocity: 1 },
      { time: '0:2', note: 'C5', velocity: 1 },
      { time: '0:3', note: 'C5', velocity: 1 },
    ]
    const draw = this.gameService.getDraw()
    TransportService.createPart(synth, draw, METRONOME_PATTERN)
  }
}

export default AppService
