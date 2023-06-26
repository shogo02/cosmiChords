import Keyboard from './Keyboard'
import Main from './Main'
import Mixer from './Mixer'
import Nob from './Nob'
import Pad from './Pad'
import AppService from '../services/AppService'
import gameStates from '../models/GameStates'

const appService = AppService.createAppservice()
appService.init()
appService.start()

function App() {
  console.log('app rendering')

  const currentChord = gameStates((state) => state.currentChord)
  const activeNote = gameStates((state) => state.activeNote)

  return (
    <div className="h-screen bg-[#dedede] select-none font-mono">
      <div className="flex flex-row justify-between h-4/5">
        <div className="basis-1/2 border border-black">
          <Pad />
        </div>
        <div className="basis-full border border-black flex flex-col pt-20 mx-14">
          <div className="h-5/6 border border-black">
            <Main chord={currentChord} activeNote={activeNote} />
          </div>
          <div className="h-1/6 border border-black">
            <Nob />
          </div>
        </div>
        <div className="basis-1/2 border border-black">
          <Mixer />
        </div>
      </div>
      <div className="h-1/5 border border-black">
        <Keyboard activeNote={activeNote} />
      </div>
    </div>
  )
}

export default App
