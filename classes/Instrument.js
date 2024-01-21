import getNote from "../functions/Note";
import { audioCtx } from "../main";

class Instrument {
  constructor() {
    this.notes = [];
  }

  chord(notes, callback) {
    const chord = notes.map((note) => callback(getNote(note, 4)));
    return chord;
  }

  out() {
    this.notes.forEach((note) => {
      note.connect(audioCtx.destination);
      note.start();
    });
  }
}

export default Instrument;
