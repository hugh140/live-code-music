import { audioCtx } from "./audioMain";

let audioSamples = {};

async function appendAudioSamples(samples) {
  audioSamples = {};
  for (const sample of samples) loadSample(sample.file);
}

function loadSample(sampleFile) {
  const fileReader = new FileReader();
  fileReader.onload = async () => {
    audioSamples[sampleFile.name] = await audioCtx.decodeAudioData(
      fileReader.result
    );
  };
  fileReader.readAsArrayBuffer(sampleFile);
}

export { appendAudioSamples, audioSamples };
