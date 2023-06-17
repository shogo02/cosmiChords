import SynthCreator from '../utils/SynthCreator'
import ChordGenerator from './ChordGenerator'
import GameState from './GameState'
import PcKeyService from './PcKeyService'
import TransportService, { Pattern } from './TransportService'

const METRONOME_PATTERN: Pattern = [
  { time: 0, note: 'C6', velocity: 1 },
  { time: '0:1', note: 'C5', velocity: 1 },
  { time: '0:2', note: 'C5', velocity: 1 },
  { time: '0:3', note: 'C5', velocity: 1 },
]

class GameService {
  private chordGenerator: ChordGenerator

  private gameState: GameState

  private transportService: TransportService

  private pcKeyService: PcKeyService

  private constructor(
    chordGenerator: ChordGenerator,
    gameState: GameState,
    transportService: TransportService,
    pcKeyService: PcKeyService
  ) {
    this.chordGenerator = chordGenerator
    this.gameState = gameState
    this.transportService = transportService
    this.pcKeyService = pcKeyService
  }

  static createGameService() {
    return new GameService(
      new ChordGenerator(),
      new GameState('C', ''),
      new TransportService(SynthCreator.createSynth(), METRONOME_PATTERN),
      new PcKeyService()
    )
  }

  init() {
    this.createPart()
    this.setPcKeyListner()
  }

  private createPart() {
    const draw = () => {
      console.log('draw!!')
    }
    const synth = SynthCreator.createSynth()
    this.transportService = new TransportService(synth, METRONOME_PATTERN, draw)
    this.transportService.createPart()
  }

  private setPcKeyListner() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    // this.pcKeyService.setKeySpaceAction(() => TransportService.stop)
    this.pcKeyService.setKeySpaceAction(() => console.log('pressSpace'))
  }

  getPcKeyService() {
    return this.pcKeyService
  }
}

export default GameService
