import Osc from "./classes/Osc";
import Effect from "./classes/Effect";
import Drum from "./classes/Drum";

const executeButton = document.getElementById("execute-button");
const stopButton = document.getElementById("stop-button");
const codeArea = document.getElementById("code-area");

Object.assign(Osc.prototype, Effect);
Object.assign(Drum.prototype, Effect);

const audioCtx = new AudioContext();
export { audioCtx };

audioCtx.suspend();

let audioTime = 0;

executeButton.addEventListener("click", async () => {
  audioCtx.resume();
  let currentNote = 0;
  let nextNoteTime = 0.0;
  let bpm = 150;

  function nextNote() {
    const secondsPerBeat = 60 / bpm / 4;
    nextNoteTime += secondsPerBeat;
    currentNote = (currentNote + 1) % 4;
  }

  function scheduler(loopFunction) {
    while (nextNoteTime < audioCtx.currentTime - audioTime) {
      loopFunction();
      nextNote();
    }
    setTimeout(() => scheduler(loopFunction), 1);
  }

  const kick = await new Drum("kick.wav").load();
  const snare = await new Drum("snare.wav").load();
  const hihat = await new Drum("hihat.wav").load();

  kick.sequence("xx-xxx-x-").gain(0.5);
  snare.sequence("").filter(1000).gain(0.5);
  hihat.random(64, 50).gain(0.4);

  const triangle = new Osc("triangle")
    .chord(["c3", "e3", "a3"], 32)
    .chord(["c3", "e2", "g2"], 12)
    .arp(["c3", "e2", "g2"], 4, "random")
    .chord(["e3", "g2", "g3"], 12)
    .arp(["e3", "g2", "g3"], 4, "random")
    .gain(0.2);

  const square = new Osc("square")
    .arp(["b4", "d5", "e5", "f#5", "e5"], 1, "random")
    .gain(0.1)
    .pan(-1)
    .filter(1500);

  const square2 = new Osc("square")
    .arp(["b4", "d5", "e5", "f#5", "e5"], 1, "random")
    .gain(0.05)
    .pan(1)
    .filter(1500);

  scheduler(() => {
    kick.play();
    // snare.play();
    hihat.play();

    triangle.play();
  });

  // Eval

  // eval(codeArea.value);
});

stopButton.addEventListener("click", () => {
  audioCtx.suspend();
  audioTime = audioCtx.currentTime;
});
