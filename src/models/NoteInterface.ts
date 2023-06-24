import { AccidentalType, NoteName } from '../customTypes/musicalTypes'

interface NoteInterface {
  get number(): number
  get name(): NoteName
  get accidental(): AccidentalType
}

export default NoteInterface
