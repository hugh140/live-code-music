import { useEffect, useRef } from "react";
import { assignEditorCode, buttonEvents } from "./audioMain";
import Editor, { useMonaco } from "@monaco-editor/react";
import UploadPanel from "./components/UploadPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

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
    <main className="p-5">
      <div className="flex flex-row gap-10">
        <div className="relative mx-auto basis-1/2">
          <Editor
            height="80vh"
            width="auto"
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

        <div className="relative mx-auto basis-1/2">
          <Editor
            height="80vh"
            width="auto"
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

        <div className="basis-1/6">
          <UploadPanel />
        </div>
      </div>
      <div className="flex pt-3 mt-3 gap-5 border-t-2 border-zinc-500">
        <button
          className="border-2 p-2 rounded px-4 border-lime-500 text-lime-500
            hover:bg-lime-600 hover:text-white active:text-white active:bg-lime-950"
          ref={playButton}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          className="border-2 p-2 rounded px-4 border-red-500 text-red-500
            hover:bg-red-600 hover:text-white active:text-white active:bg-red-950"
          ref={stopButton}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
    </main>
  );
}

export default App;
