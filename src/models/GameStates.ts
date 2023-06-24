import Chord from './Chord'

/**
 * リアルタイムに変化する値を管理する
 */
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
