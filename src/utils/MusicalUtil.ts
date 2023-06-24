import Constants from '../constants/constants'
import { ChordType, DiatonicType } from '../customTypes/musicalTypes'

const { SCALE, PC_KEY, MIDI_NUMBER_TO_NAME } = Constants

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

  /**
   * PCキー入力からNoteNumberを取定する
   */
  static getNoteNumberFromPcKey(key: string, octobe: number) {
    if (octobe < 0 || octobe > 9 || !Number.isInteger(octobe)) {
      throw new Error(`Invalid octobe: ${octobe}`)
    }

    const offSet = octobe * 12
    let index = PC_KEY[0].findIndex((value) => value === key)
    if (index >= 0) {
      return MIDI_NUMBER_TO_NAME[index + offSet + 12]
    }

    index = PC_KEY[1].findIndex((value) => value === key)
    if (index >= 0) {
      return MIDI_NUMBER_TO_NAME[index + offSet]
    }
    throw new Error(`Invalid PCkey: ${key}`)
  }
}

export default MusicalUtil
