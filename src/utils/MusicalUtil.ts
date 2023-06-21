import Constants from '../constants/constants'
import { Accidental, ChordType, NoteName, DiatonicType } from '../customTypes/musicalTypes'

const { SCALE, PC_KEY, MIDI_NUMBER_TO_NAME } = Constants

class MusicalUtil {
  /**
   * Noteが2オクターブ以内にあるか
   */
  private static isIn2Octobe(noteNumber: number) {
    return noteNumber < 1 || noteNumber > 24
  }

  /**
   * Noteが1オクターブ以内にあるか
   */
  private static isIn1Octobe(noteNumber: number) {
    return noteNumber < 1 || noteNumber > 12
  }

  /**
   * 2オクターブ以上の音を1オクターブに変換する
   * @param noteNumber 1 ~ 24
   * @returns 1 ~ 12
   */
  static fixeNoteNumber(noteNumber: number) {
    if (this.isIn2Octobe(noteNumber)) throw new Error(`Invalid note number: ${noteNumber}`)
    return noteNumber > 12 ? noteNumber - 12 : noteNumber
  }

  /**
   * 2オクターブ以内のNoteNumberから音名を取得する
   * @param noteNumber 1 ~ 24
   * @param accidental
   * @returns
   */
  static noteNumberToName(noteNumber: number, accidental: Accidental): NoteName {
    if (this.isIn2Octobe(noteNumber)) throw new Error(`Invalid note number: ${noteNumber}`)
    if (noteNumber === 1 || noteNumber === 13) return 'C'
    if (noteNumber === 2 || noteNumber === 14) return accidental === '#' ? 'C#' : 'Db'
    if (noteNumber === 3 || noteNumber === 15) return 'D'
    if (noteNumber === 4 || noteNumber === 16) return accidental === '#' ? 'D#' : 'Eb'
    if (noteNumber === 5 || noteNumber === 17) return 'E'
    if (noteNumber === 6 || noteNumber === 18) return 'F'
    if (noteNumber === 7 || noteNumber === 19) return accidental === '#' ? 'F#' : 'Gb'
    if (noteNumber === 8 || noteNumber === 20) return 'G'
    if (noteNumber === 9 || noteNumber === 21) return accidental === '#' ? 'G#' : 'Ab'
    if (noteNumber === 10 || noteNumber === 22) return 'A'
    if (noteNumber === 11 || noteNumber === 23) return accidental === '#' ? 'A#' : 'Bb'
    return 'B' // 12 or 24
  }

  /**
   * コード構成音を返す
   * @param rootNumber 1 ~ 12
   * @param chordType
   * @param accidental
   * @returns
   */
  static getNoteNamesInChord(rootNumber: number, chordType: ChordType, accidental: Accidental) {
    this.isIn1Octobe(rootNumber)
    const notesInChordNumber = Constants.getNotesInChordNumber(chordType)
    const noteNamesInChord: NoteName[] = []
    notesInChordNumber.forEach((noteNumber) => {
      const calcNoteNumber = this.fixeNoteNumber(rootNumber + noteNumber - 1)
      const noteName = this.noteNumberToName(calcNoteNumber, accidental)
      noteNamesInChord.push(noteName)
    })
    return noteNamesInChord
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
