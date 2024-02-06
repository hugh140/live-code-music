import Instrument from "./Instrument";
import { audioAnalyzer, audioCtx } from "../scripts/audioMain";

class Drum extends Instrument {
  static instances = [];

  constructor() {
    super();
    this.audioBuffer;
    this.pattern = [true];
    this.actualSample;

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

  load(drumFile) {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      this.audioBuffer = await audioCtx.decodeAudioData(fileReader.result);
    };
    fileReader.readAsArrayBuffer(drumFile);

    return this;
  }

  play() {
    if (!this.pattern[this.beat]) {
      this.beat = this.pattern.length - 1 > this.beat ? this.beat + 1 : 0;
      return;
    }

    if (!this.effectChain.length) this.gainNode.connect(audioAnalyzer);
    else this.effectChain.at(-1).connect(audioAnalyzer);
    audioAnalyzer.connect(audioCtx.destination);

    this.actualSample = new AudioBufferSourceNode(audioCtx, {
      buffer: this.audioBuffer,
    });
    this.actualSample.connect(this.gainNode);
    this.actualSample.start();
    this.beat = this.pattern.length - 1 > this.beat ? this.beat + 1 : 0;
  }

  static getAllInstances() {
    return Drum.instances;
  }
}
export default Drum;
