import InputController from '../controllers/Input/InputController'
import GameService from './GameService'

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
    this.gameService.init()
    this.inputController.init()
  }

  start() {
    this.gameService.start()
  }
}

export default AppService
