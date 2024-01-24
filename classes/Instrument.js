import getNote from "../js/Note";
import { audioCtx } from "../main";

class Instrument {
  constructor() {
    this.effectChain = [];
    this.gainNode = new GainNode(audioCtx, {
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
}

export default Instrument;
