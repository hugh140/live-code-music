import Instrument from "./Instrument";
import { audioCtx } from "../main";

class Drum extends Instrument {
  constructor(drumName) {
    super();
    this.audioBuffer;
    this.pattern = [true];
    this.beat = 0;
    this.drumName = drumName;
  }

  sequence(pattern) {
    const patternArray = pattern.split("");
    this.pattern = patternArray.map((beat) =>
      beat.toUpperCase() === "X" ? true : false
    );
    console.log(this.pattern);
    return this;
  }

  async load() {
    return new Promise(async (resolve) => {
      const response = await fetch(this.drumName);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      resolve(this);
    });
  }

  play() {
    console.log(this.beat);
    if (!this.pattern[this.beat]) {
      this.beat = this.pattern.length - 1 > this.beat ? this.beat + 1 : 0;
      return;
    }

    if (!this.effectChain.length) this.gainNode.connect(audioCtx.destination);
    else this.effectChain.at(-1).connect(audioCtx.destination);

    const sample = new AudioBufferSourceNode(audioCtx, {
      buffer: this.audioBuffer,
    });
    sample.connect(this.gainNode);
    sample.start();
    this.beat = this.pattern.length - 1 > this.beat ? this.beat + 1 : 0;
  }
}
export default Drum;
