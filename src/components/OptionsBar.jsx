import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { buttonEvents, setBpm, setTimeSignature } from "../scripts/audioMain";
import { useRef, useEffect } from "react";

let top = 4;
let bottom = 4;
let bpm = 120;

function OptionsBar() {
  const playButton = useRef();
  const stopButton = useRef();

  useEffect(() => {
    buttonEvents(playButton.current, stopButton.current);
  }, [stopButton]);

  function changeBpm(evt) {
    bpm = evt.target.value;
    if (bpm < 40) bpm = 40;
    else if (bpm > 300) bpm = 300;
    setBpm(bpm);
    evt.target.value = bpm;
  }

  function changeTopTimeSignature(evt) {
    top = evt.target.value;
    if (top < 1) top = 1;
    else if (top > 13) top = 13;
    setTimeSignature(top, bottom);
    evt.target.value = top;
  }

  function changeBottomTimeSignature(evt) {
    bottom = evt.target.value;
    if (bottom > 8 || bottom < 4) bottom = 4;
    else if (bottom < 8 && bottom > 4)
      bottom = Math.abs(8 - bottom) < Math.abs(4 - bottom) ? 8 : 4;
    setTimeSignature(top, bottom);
    evt.target.value = bottom;
  }

  return (
    <>
      <button
        className="border-2 p-2 rounded px-5 border-[#247F68] text-[#247F68]
            hover:bg-[#226856] hover:text-white active:text-white active:bg-[#1c5748]"
        ref={playButton}
      >
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button
        className="border-2 p-2 rounded px-5 border-red-500 text-red-500
            hover:bg-red-900 hover:text-white active:text-white active:bg-red-950"
        ref={stopButton}
      >
        <FontAwesomeIcon icon={faStop} />
      </button>
      <div className="text-white text-center">
        <input
          defaultValue={120}
          type="number"
          className="w-[60px] h-7 p-2 text-center text-2xl bg-transparent"
          name="bpm"
          onBlur={changeBpm}
        />
        <div>BPM</div>
      </div>
      <div className="text-white text-center">
        <div>
          <input
            defaultValue={4}
            type="number"
            className="w-[60px] h-7 p-2 text-center text-2xl bg-transparent"
            name="top"
            onBlur={changeTopTimeSignature}
          />
          <span className="text-2xl">/</span>
          <input
            defaultValue={4}
            type="number"
            className="w-[60px] h-7 p-2 text-center text-2xl bg-transparent"
            name="bottom"
            onBlur={changeBottomTimeSignature}
          />
          <button type="submit" autoFocus></button>
        </div>
        <div>Time Signature</div>
      </div>
    </>
  );
}
export default OptionsBar;
