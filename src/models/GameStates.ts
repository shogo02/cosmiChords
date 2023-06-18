import Chord from './Chord'

class GameStates {
  private _currentChord: Chord | undefined

  get currentChord(): Chord | undefined {
    return this._currentChord
  }
}

export default GameStates
