import Constants from '../constants/constants'
import { ChordType, DiatonicType } from '../customTypes/musicalTypes'

const { SCALE, MIDI_NUMBER_TO_NAME } = Constants

class MusicalUtil {
  /**
   * Noteが2オクターブ以内にあるか
   */
  static isIn2Octobe(noteNumber: number) {
    return noteNumber < 1 || noteNumber > 24
  }

  /**
   * Noteが1オクターブ以内にあるか
   */
  static isIn1Octobe(noteNumber: number) {
    return noteNumber < 1 || noteNumber > 12
  }

  /**
   * 2オクターブ以上の音を1オクターブに変換する
   * @param noteNumber 1 ~ 24
   * @returns 1 ~ 12
   */
  static fixedNoteNumber(noteNumber: number) {
    if (MusicalUtil.isIn2Octobe(noteNumber)) throw new Error(`Invalid note number: ${noteNumber}`)
    return noteNumber > 12 ? noteNumber - 12 : noteNumber
  }

  static isValidMidiNumber(midiNumber: number) {
    return midiNumber >= 0 && midiNumber <= 127
  }

  static isValidOctobe(octobe: number) {
    return Number.isInteger(octobe) && octobe >= 0 && octobe <= 9
  }

  /**
   * 指定した度数のダイアトニックコードを返す
   * @param degree 1 ~ 7
   * @param type
   * @returns
   */
  static getChordTypeFromDegreeNum(degree: number, type: DiatonicType): ChordType {
    if (degree === 1) return type === '3note' ? '' : 'M7'
    if (degree === 2) return type === '3note' ? 'm' : 'm7'
    if (degree === 3) return type === '3note' ? 'm' : 'm7'
    if (degree === 4) return type === '3note' ? '' : 'M7'
    if (degree === 5) return type === '3note' ? '' : 'M7'
    if (degree === 6) return type === '3note' ? 'm' : 'm7'
    if (degree === 7) return type === '3note' ? 'mb5' : 'm7b5'
    throw new Error(`Invalid degree: ${degree}`)
  }

  /**
   * 指定したキーのメジャースケールを取得する
   * @param key 1 ~ 12
   * @returns 1 ~ 24
   */
  static getMajorScale(key: number) {
    this.isIn1Octobe(key)
    return SCALE.MAJOR_SCALSE.map((noteNumber) => noteNumber + key - 1)
  }

  static getNoteFromMidiNumber(midiNumber: number, octobe: number) {
    if (!MusicalUtil.isValidOctobe(octobe)) {
      throw new Error(`Invalid octobe: ${octobe}`)
    }

    if (!MusicalUtil.isValidMidiNumber(midiNumber)) {
      throw new Error(`Invalid midiNumber: ${midiNumber}`)
    }

    const offSet = octobe * 12
    const resultMidiNumber = midiNumber + offSet

    if (!MusicalUtil.isValidMidiNumber(resultMidiNumber)) {
      throw new Error(`Invalid midiNumber: ${resultMidiNumber}`)
    }

    return MIDI_NUMBER_TO_NAME[resultMidiNumber]
  }
}

export default MusicalUtil
