import { create } from 'zustand'
import Chord from './Chord'

type GameStates = {
  currentChord: Chord
  setCurrentChord: (newChord: Chord) => void
}

/**
 * リアルタイムに変化する値を管理する
 */
const gameStates = create<GameStates>((set) => ({
  currentChord: new Chord(1, ''),
  setCurrentChord: (newChord: Chord): void => set({ currentChord: newChord }),
}))

export default gameStates
