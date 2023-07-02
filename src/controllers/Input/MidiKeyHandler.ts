import { Input, WebMidi } from 'webmidi'
import { NoteAction } from './InputController'

class MidiKeyHandler {
  private noteOnAction?: NoteAction

  private noteOffAction?: NoteAction

  private addMidiDevice?: (midiDevices: Input) => void

  private removeMidiDevice?: (midiDevices: Input) => void

  init(addMidiDevice: (midiDevice: Input) => void, removeMidiDevice: (midiDevices: Input) => void) {
    this.addMidiDevice = addMidiDevice
    this.removeMidiDevice = removeMidiDevice
    WebMidi.enable()
      .then((e) => {
        this.addListner()
      })
      .catch((err: string) => {
        throw new Error(err)
      })
  }

  setNoteAction(noteOnAction: NoteAction, noteOffAction: NoteAction) {
    this.noteOnAction = noteOnAction
    this.noteOffAction = noteOffAction
  }

  addListner() {
    WebMidi.removeListener()

    WebMidi.inputs.forEach((e) => {
      this.addInput(e)
    })

    WebMidi.addListener('connected', (e) => {
      this.addInput(e.port as Input)
    })

    WebMidi.addListener('disconnected', (e) => {
      this.removeInput(e.port as Input)
    })
  }

  addInput(input: Input) {
    this.addMidiDevice?.(input)
    this.addInputListner(input)
  }

  removeInput(input: Input) {
    this.removeMidiDevice?.(input)
    input.removeListener()
  }

  addInputListner(input: Input) {
    input.removeListener()
    input.addListener('noteon', (e) => this.noteOnAction?.(e.note.number))
    input.addListener('noteoff', (e) => this.noteOffAction?.(e.note.number))
  }
}

export default MidiKeyHandler
