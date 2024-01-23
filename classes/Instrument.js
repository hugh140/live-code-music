import getNote from "../functions/Note";
import { audioCtx } from "../main";

class Instrument {
  constructor() {
    this.notes = [];
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

  out() {
    if (!this.effectChain.length) this.gainNode.connect(audioCtx.destination);
    else this.effectChain.at(-1).connect(audioCtx.destination);

    this.notes.forEach((note) => {
      note.connect(this.gainNode);
      note.start();
    });
  }
}

export default Instrument;
