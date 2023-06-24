import GameService from '../services/GameService'

class ViewHandler {
  private gs: GameService

  constructor(gameService: GameService) {
    this.gs = gameService
  }
}

export default ViewHandler
