import { create } from 'zustand'
import { Input } from 'webmidi'
import { AccidentalType, DiatonicKey, DiatonicType } from '../customTypes/musicalTypes'
import ct from '../constants/constants'

export type GameSetting = {
  diatonicKey: number
  diatonicKeyName: DiatonicKey
  setDiatonicKey: (diatonicKey: number) => void

  diatonicType: DiatonicType
  setDiatonicType3note: () => void
  setDiatonicType4note: () => void

  accidental: AccidentalType
  setAccidentalFlat: () => void
  setAccidentalSharp: () => void

  pianoOctobe: number
  setPianoOctobe: (pianoOctobe: number) => void

  midiDevices: Input[]
  getMidiDeviceNames: () => string[]
  setMidiDevices: (midiDevices: Input[]) => void
  addMidiDevice: (midiDevice: Input) => void
  removeMidiDevice: (midiDevice: Input) => void
}

/**
 * ゲーム設定を管理する
 */
const gameSettings = create<GameSetting>((set, get) => ({
  diatonicKey: 1,
  get diatonicKeyName() {
    return ct.DIATONIC_KEY_MAP[get().diatonicKey]
  },
  setDiatonicKey: (diatonicKey: number) =>
    set(() => {
      if (diatonicKey < 1 || diatonicKey > 12) {
        throw new Error('Number value must be between 1 and 12')
      }
      return { diatonicKey }
    }),

  diatonicType: '4note',
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

  midiDevices: [],
  getMidiDeviceNames: () => get().midiDevices.map((d) => d.name),
  setMidiDevices: (midiDevices: Input[]) => set(() => ({ midiDevices })),
  addMidiDevice: (midiDevice: Input) =>
    set((state) => {
      if (get().midiDevices.some((d) => d.name === midiDevice.name)) {
        return { midiDevices: [...get().midiDevices] }
      }
      return { midiDevices: [...state.midiDevices, midiDevice] }
    }),
  removeMidiDevice: (midiDevice: Input) =>
    set(() => ({
      midiDevices: get().midiDevices.filter((d) => d.name !== midiDevice.name),
    })),
}))

export default gameSettings
function createSelector(arg0: (state: GameSetting) => Input[], arg1: (midiDevices: any) => any) {
  throw new Error('Function not implemented.')
}
