import Osc from "../classes/Osc";
import Effect from "../classes/Effect";
import Drum from "../classes/Drum";
import { audioSamples } from "./loadSamples";

Object.assign(Osc.prototype, Effect);
Object.assign(Drum.prototype, Effect);

const audioCtx = new AudioContext();
audioCtx.suspend();

const audioAnalyzer = new AnalyserNode(audioCtx, {
  fftSize: 256,
  maxDecibels: 100,
  minDecibels: -100,
});

let timerID = 0;
let startTime = false;
let stopTime = false;
let currentNote = 0;
let firstBeat = 0;
let nextNoteTime = 0;
let topTimeSignature = 4;
let bottomTimeSignature = 4;
let bpm = 120;
let codeFunction;

let setupArea, loopArea;

function play() {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
    startTimer();
  } else startTime = true;
}

function stop() {
  stopTime = true;
}

document.body.addEventListener("keydown", (evt) => {
  if (evt.repeat) return;
  if (evt.ctrlKey && evt.key === "Enter") play();
});

// Setting DOM events and variables values
function buttonEvents(playButton, stopButton) {
  playButton.addEventListener("click", play);
  stopButton.addEventListener("click", stop);
}

function assignEditorCode(setup, loop) {
  setupArea = setup;
  loopArea = loop;
}

function setBpm(changeBpm) {
  bpm = changeBpm;
}

function setTimeSignature(top, bottom) {
  topTimeSignature = top;
  bottomTimeSignature = bottom;
}

// Music metric engine
function startTimer() {
  Osc.getAllInstances().forEach((instance) =>
    instance.playingNotes.forEach((note) => note.stop())
  );
  Drum.getAllInstances().forEach((instance) => instance.actualSample?.stop());

  codeFunction = new Function(
    "Osc",
    "Drum",
    "loop",
    "sample",
    `return (async function() {
      ${setupArea}
      loop(() => {${loopArea}})
    })()`
  );
  codeFunction(Osc, Drum, loop, audioSamples);
}

function stopTimer() {
  audioCtx.suspend();
  window.clearTimeout(timerID);
  startTime = false;
  stopTime = false;
  currentNote = 0;
  firstBeat = 0;
}

function loop(loopFunction) {
  while (nextNoteTime < audioCtx.currentTime) {
    if (startTime)
      if (
        firstBeat === topTimeSignature - 1 &&
        currentNote === topTimeSignature - 1
      ) {
        startTime = false;
        startTimer();
        return;
      }

    if (stopTime)
      if (
        firstBeat === topTimeSignature - 1 &&
        currentNote === topTimeSignature - 1
      ) {
        stopTimer();
        return;
      }

    loopFunction();
    nextNote();
  }
  timerID = setTimeout(() => loop(loopFunction), 0);
}

function nextNote() {
  nextNoteTime += 60 / bpm / bottomTimeSignature;
  currentNote = (currentNote + 1) % topTimeSignature;

  if (currentNote === 0) firstBeat = (firstBeat + 1) % topTimeSignature;
}

export {
  buttonEvents,
  assignEditorCode,
  setBpm,
  setTimeSignature,
  audioCtx,
  audioAnalyzer,
  firstBeat,
};
