import Instrument from "./Instrument";
import { audioCtx } from "../main";

class Osc extends Instrument {
  constructor(type = "sine") {
    super();
    this.type = type;
    this.notes = [];
  }

  chord(notes) {
    const callback = (note) =>
      new OscillatorNode(audioCtx, {
        type: this.type,
        frequency: note,
      });
    this.notes = super.chord(notes, callback);
    return this;
  }

  play() {
    if (!this.effectChain.length) this.gainNode.connect(audioCtx.destination);
    else this.effectChain.at(-1).connect(audioCtx.destination);

    this.notes.forEach((note) => {
      note.connect(this.gainNode);
      note.start();
    });
  }
}

export default Osc;
