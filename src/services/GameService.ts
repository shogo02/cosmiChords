import { GameSetting } from '../models/GameSettings'
import { GameState } from '../models/GameStates'
import ChordGenerator from './ChordGenerator'

class GameService {
  private chordGenerator: ChordGenerator // TODO 今のところインスタンスの使い道がない

  private gameSettings?: GameSetting

  private gameStates?: GameState

  private constructor(chordGenerator: ChordGenerator) {
    this.chordGenerator = chordGenerator
  }

  static createGameService() {
    const chordGenerator = new ChordGenerator()
    return new GameService(chordGenerator)
  }

  init(gameSetting: GameSetting, gameStates: GameState) {
    this.gameSettings = gameSetting
    this.gameStates = gameStates
  }

  start() {
    this.generateChord()
  }

  public generateChord() {
    if (!this.gameSettings) throw new Error('not found gameSettings')
    if (!this.gameStates) throw new Error('not found gameSettings')
    const { diatonicKey, diatonicType, accidental } = this.gameSettings
    this.chordGenerator.createDiatonicValidChords(diatonicKey, diatonicType, accidental)
    this.gameStates.setCurrentChord(this.chordGenerator.getRandomChord())
  }

  public getDraw() {
    return () => {
      this.generateChord()
    }
  }
}

export default GameService
