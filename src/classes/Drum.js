import Instrument from "./Instrument";
import { audioCtx } from "../audioMain";

class Drum extends Instrument {
  static instances = [];

  constructor(drumName) {
    super();
    this.audioBuffer;
    this.pattern = [true];
    this.drumName = drumName;

    Drum.instances.push(this);
  }

  sequence(pattern) {
    const patternArray = pattern.split("");
    this.pattern = patternArray.map((beat) =>
      beat.toUpperCase() === "X" ? true : false
    );
    return this;
  }

  random(beatsNumber = 8, probability = 50) {
    this.pattern = (() => {
      const pattern = [];
      probability = 1 - probability / 100;

      for (let i = 0; i < beatsNumber; i++)
        pattern.push(Math.random() > probability ? true : false);
      return pattern;
    })();
    return this;
  }

  async load() {
    const response = await fetch(this.drumName);
    const arrayBuffer = await response.arrayBuffer();
    this.audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    return this;
  }

  play() {
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

  static getAllInstances() {
    return Drum.instances;
  }
}
export default Drum;