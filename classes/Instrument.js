import getNote from "../functions/Note";
import { audioCtx } from "../main";

class Instrument {
  constructor() {
    this.notes = [];
    this.lastEffect = new GainNode(audioCtx, {
      gain: 0.3,
    });
  }

  chord(notes, callback) {
    const chord = notes.map((note) => callback(getNote(note)));
    return chord;
  }

  stop() {
    this.notes.forEach((note) => {
      note.stop();
    });
  }

  out() {
    this.lastEffect.connect(audioCtx.destination);
    this.notes.forEach((note) => {
      note.connect(this.lastEffect);
      note.start();
    });
  }
}

export default Instrument;
