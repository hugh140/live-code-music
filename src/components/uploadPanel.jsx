import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { appendAudioSamples } from "../audioMain";

function UploadPanel() {
  const [audioSamples, setAudioSamples] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      const audioSamplesCopy = [...audioSamples];
      files.forEach((file) => audioSamplesCopy.push(file));
      setAudioSamples(audioSamplesCopy);
      appendAudioSamples(audioSamplesCopy);
    },
    multiple: true,
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/ogg": [".ogg"],
      "audio/wav": [".wav"],
    },
  });

  function editAudioSampleName(index) {
    const newName = prompt("Write a new name for the sample.");
    if (!newName) return;

    const audioSamplesCopy = [...audioSamples];
    audioSamplesCopy[index] = new File([audioSamplesCopy[index]], newName);
    setAudioSamples(audioSamplesCopy);
    appendAudioSamples(audioSamplesCopy);
  }

  function deleteAudioSample(index) {
    const audioSamplesCopy = [...audioSamples];
    audioSamplesCopy.splice(index, 1);
    setAudioSamples(audioSamplesCopy);
    appendAudioSamples(audioSamplesCopy);
  }

  return (
    <aside className="border-2 p-2 border-zinc-800 rounded-lg h-full">
      <div
        {...getRootProps()}
        className="border-b-2 border-zinc-800 rounded-lg p-5 text-center border-dashed 
        hover:bg-zinc-800 cursor-pointer ease-out duration-75 mb-3"
      >
        <input {...getInputProps()} />
        <FontAwesomeIcon
          icon={faPlus}
          className="text-white text-center text-2xl"
        />
        <h1 className="text-white">Upload Samples</h1>
      </div>

      <ul className="text-white">
        {audioSamples.map((sample, index) => (
          <div key={index}>
            <li
              className="bg-zinc-900 p-2 my-1 relative cursor-pointer"
              id="sampleList"
            >
              <p className="truncate">
                {index + 1}. {sample.name}
              </p>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                bg-black w-full h-full place-items-center opacity-70 hidden"
                id="sampleOptions"
              >
                <div
                  className="flex place-content-end place-items-center h-full
                  gap-2"
                >
                  <button
                    className="bg-lime-500 p-1 rounded active:bg-lime-800"
                    onClick={() => editAudioSampleName(index)}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  <button
                    className="bg-red-500 p-1 rounded active:bg-red-800"
                    onClick={() => deleteAudioSample(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </aside>
  );
}
export default UploadPanel;
