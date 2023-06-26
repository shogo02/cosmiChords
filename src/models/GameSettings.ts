import { create } from 'zustand'
import { AccidentalType, DiatonicType } from '../customTypes/musicalTypes'

export type GameSetting = {
  diatonicKey: number
  diatonicType: DiatonicType
  accidental: AccidentalType
  pianoOctobe: number
}

/**
 * ゲーム設定を管理する
 */
const gameSettings = create<GameSetting>((set) => ({
  diatonicKey: 1,
  setDiatonicKey: (diatonicKey: number) =>
    set(() => {
      if (diatonicKey < 1 || diatonicKey > 12) {
        throw new Error('Number value must be between 1 and 12')
      }
      return { diatonicKey }
    }),

  diatonicType: '3note',
  setDiatonicType3note: () => set({ diatonicType: '3note' }),
  setDiatonicType4note: () => set({ diatonicType: '4note' }),

  accidental: 'b',
  setAccidentalFlat: () => set({ accidental: 'b' }),
  setAccidentalSharp: () => set({ accidental: '#' }),

  pianoOctobe: 0,
  setPianoOctobe: (pianoOctobe: number) =>
    set(() => {
      if (pianoOctobe < 0 || pianoOctobe > 9) {
        throw new Error('Number value must be between 0 and 9')
      }
      return { pianoOctobe }
    }),
}))

export default gameSettings
