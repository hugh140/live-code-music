import { useEffect, useRef } from "react";
import { main } from "./audioMain";

function App() {
  const playButton = useRef();
  const stopButton = useRef();
  const setupArea = useRef();
  const loopArea = useRef();

  useEffect(() => {
    main(
      playButton.current,
      stopButton.current,
      setupArea.current,
      loopArea.current
    );
  }, []);

  return (
    <>
      <textarea ref={setupArea} cols="50" rows="10"></textarea>
      <br />
      <textarea ref={loopArea} cols="50" rows="10"></textarea>
      <br />
      <button ref={playButton}>Execute</button>
      <button ref={stopButton}>Stop</button>
    </>
  );
}

export default App;
