import { create } from 'zustand'
import Chord from './Chord'
import Note from './Note'

export type GameState = {
  currentChord: Chord
  setCurrentChord: (newChord: Chord) => void

  activeNote: Note[]
  addActiveNote: (newNote: Note) => void
  removeActiveNote: (targetNote: Note) => void
}

/**
 * リアルタイムに変化する値を管理する
 */
const gameStates = create<GameState>((set) => ({
  currentChord: new Chord(1, ''),
  setCurrentChord: (newChord): void => set({ currentChord: newChord }),

  activeNote: [],
  addActiveNote: (newNote): void =>
    set((state) => {
      if (!state.activeNote.some((note) => note.midiNumber === newNote.midiNumber)) {
        return {
          activeNote: [...state.activeNote, newNote],
        }
      }
      return state
    }),
  removeActiveNote: (targetNote: Note): void =>
    set((state) => ({
      activeNote: state.activeNote.filter((note) => note.midiNumber !== targetNote.midiNumber),
    })),
}))

export default gameStates
