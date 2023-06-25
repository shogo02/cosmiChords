import SynthCreator from '../utils/SynthCreator'
import ChordGenerator from './ChordGenerator'
import GameSettings from '../models/GameSettings'
import TransportService, { Pattern } from './TransportService'
import gameStates from '../models/GameStates'

const METRONOME_PATTERN: Pattern = [
  { time: 0, note: 'C6', velocity: 1 },
  { time: '0:1', note: 'C5', velocity: 1 },
  { time: '0:2', note: 'C5', velocity: 1 },
  { time: '0:3', note: 'C5', velocity: 1 },
]

class GameService {
  private chordGenerator: ChordGenerator // TODO 今のところインスタンスの使い道がない

  private gameSettings: GameSettings

  private transportService?: TransportService

  private gameStates = gameStates.getState()

  private constructor(chordGenerator: ChordGenerator, gameSettings: GameSettings) {
    this.chordGenerator = chordGenerator
    this.gameSettings = gameSettings
  }

  static createGameService() {
    const gameSettings = new GameSettings(7, '3note', 'b', 5)
    const chordGenerator = new ChordGenerator()
    return new GameService(chordGenerator, gameSettings)
  }

  init() {
    this.createPart()
  }

  start() {
    this.generateChord()
  }

  private createPart() {
    const draw = () => {
      this.generateChord()
    }
    const synth = SynthCreator.createSynth()
    this.transportService = new TransportService(synth, METRONOME_PATTERN, draw)
    this.transportService.createPart()
  }

  private generateChord() {
    const { diatonicKey, diatonicType, accidental } = this.gameSettings
    this.chordGenerator.createDiatonicValidChords(diatonicKey, diatonicType, accidental.value)
    this.gameStates.setCurrentChord(this.chordGenerator.getRandomChord())
  }
}

export default GameService
