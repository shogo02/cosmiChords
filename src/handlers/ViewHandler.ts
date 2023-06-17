import { PcKeyListenerProps } from '../components/PcKeyListner'
import GameService from '../services/GameService'

class ViewHandler {
  private gs: GameService

  constructor(gameService: GameService) {
    this.gs = gameService
  }

  getPcKeyListnerProps(): PcKeyListenerProps {
    return {
      keyDownHandler: this.gs.getPcKeyService().getKeyDownHandler(),
      keyUpHandler: this.gs.getPcKeyService().getKeyUpHandler(),
    }
  }
}

export default ViewHandler
