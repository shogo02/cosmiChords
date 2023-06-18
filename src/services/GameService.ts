import SynthCreator from '../utils/SynthCreator'
import ChordGenerator from './ChordGenerator'
import GameSettings from '../models/GameSettings'
import PcKeyService from './PcKeyService'
import TransportService, { Pattern } from './TransportService'
import GameStates from '../models/GameStates'

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

  private transportService: TransportService

  private pcKeyService: PcKeyService

  private constructor(
    chordGenerator: ChordGenerator,
    gameSettings: GameSettings,
    gameStates: GameStates,
    transportService: TransportService,
    pcKeyService: PcKeyService
  ) {
    this.chordGenerator = chordGenerator
    this.gameSettings = gameSettings
    this.gameStates = gameStates
    this.transportService = transportService
    this.pcKeyService = pcKeyService
  }

  static createGameService() {
    const gameSettings = new GameSettings('F', '')
    const gameState = new GameStates()
    const chordGenerator = new ChordGenerator()
    const transportService = new TransportService(SynthCreator.createSynth(), METRONOME_PATTERN)
    const pcKeyService = new PcKeyService()
    return new GameService(chordGenerator, gameSettings, gameState, transportService, pcKeyService)
  }

  init() {
    this.createPart()
    this.setPcKeyListner()
  }

  gameStart() {
    this.generateChord()
  }

  private createPart() {
    const draw = () => {
      console.log('draw!!')
      this.generateChord()
    }
    const synth = SynthCreator.createSynth()
    this.transportService = new TransportService(synth, METRONOME_PATTERN, draw)
    this.transportService.createPart()
  }

  private setPcKeyListner() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    // this.pcKeyService.setKeySpaceAction(() => TransportService.stop)
    this.pcKeyService.setKeySpaceAction(() => {
      TransportService.toggleTransport()
      console.log('pressSpace')
    })
  }

  private generateChord() {
    const { diatonicKey, accidental } = this.gameSettings
    this.gameStates.currentChord = ChordGenerator.generateRandomChord(diatonicKey, accidental)
    console.log(this.gameStates.currentChord)
  }

  getPcKeyService() {
    return this.pcKeyService
  }
}

export default GameService
