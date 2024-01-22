import Instrument from "./Instrument";
import { audioCtx } from "../main";

class Osc extends Instrument {
  constructor(type = "sine") {
    super();
    this.type = type;
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
}

export default Osc;
