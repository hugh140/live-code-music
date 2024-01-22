import Osc from "./classes/Osc";
import Effect from "./classes/Effect";

const executeButton = document.getElementById("execute-button");
const stopButton = document.getElementById("stop-button");
const codeArea = document.getElementById("code-area");

Object.assign(Osc.prototype, Effect);

const audioCtx = new AudioContext();
export { audioCtx };

executeButton.addEventListener("click", () => {
  audioCtx.resume();

  // Eval
  new Osc("square").gain(0.1).chord(["c3", "e3", "g3", "b3", "g4"]).out();

  // eval(codeArea.value);
});

stopButton.addEventListener("click", () => {
  audioCtx.suspend();
});
