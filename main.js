import Osc from "./classes/Osc";
import Effect from "./classes/Effect";
import Drum from "./classes/Drum";

const executeButton = document.getElementById("execute-button");
const stopButton = document.getElementById("stop-button");
const setupArea = document.getElementById("setup-area");
const loopArea = document.getElementById("loop-area");

Object.assign(Osc.prototype, Effect);
Object.assign(Drum.prototype, Effect);

const audioCtx = new AudioContext();
export { audioCtx };

audioCtx.suspend();

let timerID = 0;
let startTime = false;
let currentNote = 0;
let firstBeat = 0;
let nextNoteTime = 0;
let beat = 4;
let bpm = 150;

let codeFunction;

executeButton.addEventListener("click", () => {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
    startTimer();
  } else startTime = true;
});

stopButton.addEventListener("click", () => {
  stopTimer();
});

async function startTimer() {
  Osc.getAllInstances().forEach((instance) =>
    instance.playingNotes.forEach((note) => note.stop())
  );

  // const osc = new Osc().arp(["c3", "g3"]);
  // loop(() => osc.play());

  codeFunction = new Function(
    "Drum",
    "Osc",
    "loop",
    `return (async function() {
      ${setupArea.value}
      loop(() => {${loopArea.value}})
    })()`
  );
  codeFunction(Drum, Osc, loop);
}

function stopTimer() {
  audioCtx.suspend();
  window.clearTimeout(timerID);
  startTime = false;
  currentNote = 0;
  firstBeat = 0;
  // nextNoteTime = audioCtx.currentTime;
}

function loop(loopFunction) {
  while (nextNoteTime < audioCtx.currentTime) {
    if (startTime)
      if (firstBeat === beat - 1 && currentNote === beat - 1) {
        startTime = false;
        startTimer();
        return;
      }

    loopFunction();
    nextNote();
  }
  timerID = setTimeout(() => loop(loopFunction), 0);
}

function nextNote() {
  nextNoteTime += 60 / bpm / 4;
  currentNote = (currentNote + 1) % beat;

  if (currentNote === 0) firstBeat = (firstBeat + 1) % beat;
}
