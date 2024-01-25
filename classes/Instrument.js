import { audioCtx } from "../main";

class Instrument {
  constructor() {
    this.effectChain = [];
    this.gainNode = new GainNode(audioCtx, {
      gain: 0.3,
    });
    this.beat = 0;
  }

  stop() {
    this.notes.forEach((note) => {
      note.stop();
    });
  }
}

export default Instrument;
