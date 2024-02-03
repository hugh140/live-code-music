import { useEffect, useRef } from "react";
import { assignEditorCode, buttonEvents } from "./audioMain";
import Editor, { useMonaco } from "@monaco-editor/react";
import UploadPanel from "./components/uploadPanel";

function App() {
  const monaco = useMonaco();

  const playButton = useRef();
  const stopButton = useRef();
  let setupAreaValue;
  let loopAreaValue;

  useEffect(() => {
    buttonEvents(playButton.current, stopButton.current);
  }, [stopButton]);

  useEffect(() => {
    monaco?.editor.defineTheme("default", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          token: "identifier",
          foreground: "9CDCFE",
        },
        {
          token: "identifier.function",
          foreground: "DCDCAA",
        },
        {
          token: "type",
          foreground: "1AAFB0",
        },
      ],
      colors: {},
    });
    monaco?.editor.setTheme("default");

    // document.getElementById().style.backdropFilter

    const monacoEditor = document.getElementsByClassName("monaco-editor");
    for (const htmlElement of monacoEditor) {
      htmlElement.style.setProperty(
        "--vscode-editor-background",
        "transparent"
      );
      htmlElement.style.setProperty(
        "--vscode-editorGutter-background",
        "transparent"
      );
      htmlElement.style.backdropFilter = "blur(2px)";
    }
  }, [monaco]);

  function handleEditorChange() {
    assignEditorCode(setupAreaValue, loopAreaValue);
  }

  return (
    <>
      <div className="flex-nowrap md:flex p-5 gap-10">
        <div className="w-full md:w-1/2 relative mx-auto">
          <Editor
            height="80vh"
            width="100%"
            loading={false}
            defaultLanguage="javascript"
            theme=""
            options={{
              minimap: { enabled: false },
              overviewRulerBorder: false,
            }}
            onChange={(value) => {
              setupAreaValue = value;
              handleEditorChange();
            }}
          />
          {/* <h1
            className="absolute top-1/2 left-0 -translate-y-1/2 text-center
          text-5xl font-bold opacity-50 text-white"
            style={{
              textOrientation: "upright",
              writingMode: "vertical-rl",
              userSelect: "none",
            }}
          >
            Setup
          </h1> */}
        </div>

        <div className="w-full md:w-1/2 relative mx-auto">
          <Editor
            height="80vh"
            width="100%"
            loading={false}
            defaultLanguage="javascript"
            options={{
              minimap: { enabled: false },
              overviewRulerBorder: false,
            }}
            onChange={(value) => {
              loopAreaValue = value;
              handleEditorChange();
            }}
          />
          {/* <h1
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 text-center
            text-5xl font-bold opacity-50 text-white"
            style={{
              textOrientation: "upright",
              writingMode: "vertical-rl",
              userSelect: "none",
            }}
          >
            Loop
          </h1> */}
        </div>

        <div className="w-1/4">
          <UploadPanel />
        </div>
      </div>
      <br />
      <button className="bg-blue-500" ref={playButton}>
        Execute
      </button>
      <button ref={stopButton}>Stop</button>
    </>
  );
}

export default App;
