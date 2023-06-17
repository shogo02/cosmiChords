import SynthCreator from '../utils/SynthCreator'
import ChordGenerator from './ChordGenerator'
import GameState from './GameState'
import TransportService, { Pattern } from './TransportService'

const METRONOME_PATTERN: Pattern = [
  { time: 0, note: 'C6', velocity: 1 },
  { time: '0:1', note: 'C5', velocity: 1 },
  { time: '0:2', note: 'C5', velocity: 1 },
  { time: '0:3', note: 'C5', velocity: 1 },
]

class GameService {
  private gameState: GameState

  private chordGenerator: ChordGenerator

  private transportService?: TransportService

  constructor(codeGenerator: ChordGenerator, gameState: GameState) {
    this.chordGenerator = codeGenerator
    this.gameState = gameState
  }

  init() {
    this.createPart()
  }

  private createPart() {
    TransportService.stop()
    TransportService.partReset()

    const draw = () => {
      console.log('draw!!')
    }
    const synth = SynthCreator.createSynth()
    this.transportService = new TransportService(synth, METRONOME_PATTERN, draw)
    this.transportService.createPart()
    // TransportService.start();
  }
}

export default GameService
