import { useEffect, useRef } from "react";
import { assignEditorCode, buttonEvents } from "./audioMain";
import Editor from "@monaco-editor/react";

function App() {
  const playButton = useRef();
  const stopButton = useRef();
  const setupArea = useRef();
  const loopArea = useRef();

  useEffect(() => {
    buttonEvents(playButton.current, stopButton.current);
  }, [stopButton]);

  function handleEditorChange() {
    assignEditorCode(setupArea.current, loopArea.current);
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
        onChange={(value) => {
          setupArea.current = value;
          handleEditorChange();
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
        onChange={(value) => {
          loopArea.current = value;
          handleEditorChange();
        }}
      />
      <br />
      <button ref={playButton}>Execute</button>
      <button ref={stopButton}>Stop</button>
    </>
  );
}

export default App;
