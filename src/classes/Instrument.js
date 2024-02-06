import { audioCtx } from "../scripts/audioMain";

class Instrument {
  constructor() {
    this.effectChain = [];
    this.gainNode = new GainNode(audioCtx, {
      gain: 0.3,
    });
    this.beat = 0;
  }
}

export default Instrument;
