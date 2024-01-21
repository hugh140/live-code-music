import Osc from "./classes/Osc";

const executeButton = document.getElementById("execute-button");
const stopButton = document.getElementById("stop-button");
const codeArea = document.getElementById("code-area");

const audioCtx = new AudioContext();
export { audioCtx };

executeButton.addEventListener("click", () => {
  // new Osc().chord(["b"]).out()

  eval(codeArea.value);
});

stopButton.addEventListener("click", () => {});
