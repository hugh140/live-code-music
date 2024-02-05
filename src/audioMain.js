import Osc from "./classes/Osc";
import Effect from "./classes/Effect";
import Drum from "./classes/Drum";

Object.assign(Osc.prototype, Effect);
Object.assign(Drum.prototype, Effect);

const audioCtx = new AudioContext();
audioCtx.suspend();

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
let audioSamples = {};

let setupArea, loopArea;

// Setting DOM events and variables values
function buttonEvents(playButton, stopButton) {
  playButton.addEventListener("click", () => {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
      startTimer();
    } else startTime = true;
  });

  stopButton.addEventListener("click", () => {
    stopTime = true;
  });
}

function assignEditorCode(setup, loop) {
  setupArea = setup;
  loopArea = loop;
}

async function appendAudioSamples(samples) {
  audioSamples = {};
  for (const sample of samples)
    audioSamples[sample.file.name] = await new Drum().load(sample.file);
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

  codeFunction = new Function(
    "Osc",
    "loop",
    "sample",
    `return (async function() {
      ${setupArea}
      loop(() => {${loopArea}})
    })()`
  );
  codeFunction(Osc, loop, audioSamples);
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
  appendAudioSamples,
  setBpm,
  setTimeSignature,
  audioCtx,
};
