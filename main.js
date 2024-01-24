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

let audioTime = 0;

executeButton.addEventListener("click", async () => {
  audioCtx.resume();
  let currentNote = 0;
  let nextNoteTime = 0.0;
  let bpm = 120;

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

  let kick = await new Drum("kick.wav").load();
  kick.sequence("x-xx-x-xxx-xx-x-").gain(0.5);

  scheduler(() => {
    kick.play();
  });

  // Eval
  // new Osc("triangle").chord(["c4", "e4", "g4"]).play();
  // new Osc("square").chord(["b4"]).gain(0.1).filter(2500).play();

  // eval(codeArea.value);
});

stopButton.addEventListener("click", () => {
  audioCtx.suspend();
  audioTime = audioCtx.currentTime;
});
