import Instrument from "./Instrument";
import { audioCtx } from "../main";

class Osc extends Instrument {
  constructor(type = "sine") {
    super();
    this.type = type;
  }

  chord(notes) {
    this.notes = super.chord(
      notes,
      (note) =>
        new OscillatorNode(audioCtx, {
          type: this.type,
          frequency: note,
        })
    );
    return this;
  }
}

export default Osc;
