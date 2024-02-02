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
    // this.playingNotes.forEach((note) => note.stop());
    console.log(this.playingNotes);
  }
}

export default Instrument;
