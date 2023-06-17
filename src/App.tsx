import KeyBoard from './components/KeyBoard'
import Main from './components/Main'
import Mixer from './components/Mixer'
import Nob from './components/Nob'
import Pad from './components/Pad'
import GameService from './services/GameService'
import Chord from './models/Chord'
import PcKeyListener from './components/PcKeyListner'
import ViewHandler from './handlers/ViewHandler'

const gameService = GameService.createGameService()
const viewHandler = new ViewHandler(gameService)
gameService.init()

const { keyDownHandler, keyUpHandler } = viewHandler.getPcKeyListnerProps()

function App() {
  return (
    <div className="h-screen bg-[#dedede] select-none font-mono">
      <div className="flex flex-row justify-between h-3/4">
        <div className="basis-1/2 border border-black">
          <Pad />
        </div>
        <div className="basis-full border border-black flex flex-col pt-20 mx-14">
          <div className="h-5/6 border border-black">
            <Main chord={new Chord(1, 'M7')} />
          </div>
          <div className="h-1/6 border border-black">
            <Nob />
          </div>
        </div>
        <div className="basis-1/2 border border-black">
          <Mixer />
        </div>
      </div>
      <div className="h-1/4 border border-black">
        <KeyBoard />
      </div>
      <PcKeyListener keyDownHandler={keyDownHandler} keyUpHandler={keyUpHandler} />
    </div>
  )
}

export default App
