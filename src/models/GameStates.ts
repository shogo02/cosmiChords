import { create } from 'zustand'
import Chord from './Chord'

type gameStatesType = {
  currentChord: Chord
  setCurrentChord: (newChord: Chord) => void
}

/**
 * リアルタイムに変化する値を管理する
 */
const gameStates = create<gameStatesType>((set, get) => ({
  currentChord: new Chord(1, ''),
  setCurrentChord: (newChord: Chord): void => set({ currentChord: newChord }),
}))

export default gameStates
