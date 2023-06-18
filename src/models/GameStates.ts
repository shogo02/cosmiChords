import Chord from './Chord'

class GameStates {
  private _currentChord: Chord | undefined

  get currentChord(): Chord | undefined {
    return this._currentChord
  }

  set currentChord(chord: Chord | undefined) {
    this._currentChord = chord
  }
}

export default GameStates
