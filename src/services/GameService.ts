import SynthCreator from '../utils/SynthCreator'
import ChordGenerator from './ChordGenerator'
import GameSettings from '../models/GameSettings'
import PcKeyService from './PcKeyService'
import TransportService, { Pattern } from './TransportService'
import GameStates from '../models/GameStates'
import Chord from '../models/Chord'
import SynthService from './SynthService'

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

  private synthService: SynthService

  // TODO ↓やり方考える
  public setChordView: React.Dispatch<React.SetStateAction<Chord | undefined>> | undefined

  private constructor(
    chordGenerator: ChordGenerator,
    gameSettings: GameSettings,
    gameStates: GameStates,
    transportService: TransportService,
    pcKeyService: PcKeyService,
    synthService: SynthService
  ) {
    this.chordGenerator = chordGenerator
    this.gameSettings = gameSettings
    this.gameStates = gameStates
    this.transportService = transportService
    this.pcKeyService = pcKeyService
    this.synthService = synthService
  }

  static createGameService() {
    const gameSettings = new GameSettings(7, '3note', 'b', 5)
    const gameState = new GameStates()
    const chordGenerator = new ChordGenerator()
    const transportService = new TransportService(SynthCreator.createSynth(), METRONOME_PATTERN)
    const pcKeyService = new PcKeyService(gameSettings.pianoOctobe)
    const synthService = new SynthService(SynthCreator.createPolySynth())
    return new GameService(chordGenerator, gameSettings, gameState, transportService, pcKeyService, synthService)
  }

  init() {
    this.createPart()
    this.setPcKeyListner()
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

  private setPcKeyListner() {
    this.pcKeyService.setKeySpaceAction(() => {
      TransportService.toggleTransport()
      console.log('pressSpace')
    })

    this.pcKeyService.setNormalKeyDownAction((key: string) => {
      this.synthService.noteOn(key)
      console.log('key down')
    })

    this.pcKeyService.setNormalKeyUpAction((key: string) => {
      this.synthService.noteOff(key)
      console.log('key up')
    })
  }

  private generateChord() {
    const { diatonicKey, diatonicType, accidental } = this.gameSettings
    this.chordGenerator.createDiatonicValidChords(diatonicKey, diatonicType, accidental)
    this.gameStates.currentChord = this.chordGenerator.getRandomChord()
  }

  getPcKeyService() {
    return this.pcKeyService
  }
}

export default GameService
