import ChordGenerator from './ChordGenerator'
import gameStates from '../models/GameStates'
import gameSettings from '../models/GameSettings'

class GameService {
  private chordGenerator: ChordGenerator // TODO 今のところインスタンスの使い道がない

  private gameStates = gameStates.getState()

  private gameSettings = gameSettings.getState()

  private constructor(chordGenerator: ChordGenerator) {
    this.chordGenerator = chordGenerator
  }

  static createGameService() {
    const chordGenerator = new ChordGenerator()
    return new GameService(chordGenerator)
  }

  // init() {}

  start() {
    this.generateChord()
  }

  public generateChord() {
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
