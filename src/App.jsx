import { useRef } from "react";
import { main } from "./audioMain";
import Editor from "@monaco-editor/react";

function App() {
  const playButton = useRef();
  const stopButton = useRef();
  const setupArea = useRef();
  const loopArea = useRef();

  function handleClick() {
    main(
      playButton.current,
      stopButton.current,
      setupArea.current,
      loopArea.current
    );
  }

  return (
    <>
      <Editor
        height="100px"
        width="500px"
        defaultLanguage="javascript"
        options={{
          minimap: { enabled: false },
          overviewRulerBorder: false,
          lineNumbers: "off",
        }}
        onMount={(editor) => {
          setupArea.current = editor;
        }}
      />

      <br />

      <Editor
        height="100px"
        width="500px"
        defaultLanguage="javascript"
        options={{
          minimap: { enabled: false },
          overviewRulerBorder: false,
          lineNumbers: "off",
        }}
        onMount={(editor) => {
          loopArea.current = editor;
        }}
      />
      <br />
      <button onClick={handleClick} ref={playButton}>
        Execute
      </button>
      <button onClick={handleClick} ref={stopButton}>
        Stop
      </button>
    </>
  );
}

export default App;
