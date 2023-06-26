import { create } from 'zustand'
import Chord from './Chord'
import Note from './Note'

export type GameState = {
  currentChord: Chord
  setCurrentChord: (newChord: Chord) => void

  playingNotes: Note[]
  addPlayingNote: (newNote: Note) => void
  removePlayingNote: (targetNote: Note) => void
}

/**
 * リアルタイムに変化する値を管理する
 */
const gameStates = create<GameState>((set) => ({
  currentChord: new Chord(1, ''),
  setCurrentChord: (newChord): void => set({ currentChord: newChord }),

  playingNotes: [],
  addPlayingNote: (newNote): void =>
    set((state) => {
      if (!state.playingNotes.some((note) => note.midiNumber === newNote.midiNumber)) {
        return {
          playingNotes: [...state.playingNotes, newNote],
        }
      }
      return state
    }),
  removePlayingNote: (targetNote: Note): void =>
    set((state) => ({
      playingNotes: state.playingNotes.filter((note) => note.midiNumber !== targetNote.midiNumber),
    })),
}))

export default gameStates
