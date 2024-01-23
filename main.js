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
  // new Osc("triangle").chord(["c4", "e4", "g4"]).out();
  new Osc("square").chord(["b4"]).gain(0.3).filter(1000).out();

  // eval(codeArea.value);
});

stopButton.addEventListener("click", () => {
  audioCtx.suspend();
});
