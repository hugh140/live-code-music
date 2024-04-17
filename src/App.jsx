import { useEffect, useState } from "react";
import { assignEditorCode } from "./scripts/audioMain";
import Editor, { useMonaco } from "@monaco-editor/react";
import UploadPanel from "./components/UploadPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import OptionsBar from "./components/OptionsBar";
import BackVisuals from "./components/BackVisuals";
import useEditor from "./hooks/useEditor";

function App() {
  const [selectedCodeCard, setSelectedCodeCard] = useState(0);
  const [codeCards, setCodeCards] = useState(() => {
    const codeCardsArr = [];
    for (let i = 0; i < 8; i++) codeCardsArr[i] = { setup: "", loop: "" };
    return codeCardsArr;
  });

  useEditor();
  const monaco = useMonaco();

  useEffect(() => {
    assignCode(codeCards);
  }, [selectedCodeCard]);

  useEffect(() => {
    const regex = /^[1-8]$/;

    document.addEventListener("keydown", (evt) => {
      if (evt.repeat) return;
      if (evt.altKey && regex.test(Number(evt.key)))
        setSelectedCodeCard(Number(evt.key) - 1);
    });
  }, [selectedCodeCard]);

  function handleSetupCodeChange(value) {
    const cardsCopy = [...codeCards];
    cardsCopy[selectedCodeCard].setup = value;
    setCodeCards(cardsCopy);
    assignCode(cardsCopy);
  }

  function handleLoopCodeChange(value) {
    const cardsCopy = [...codeCards];
    cardsCopy[selectedCodeCard].loop = value;
    setCodeCards(cardsCopy);
    assignCode(cardsCopy);
  }

  function assignCode(array) {
    assignEditorCode(
      array[selectedCodeCard].setup,
      array[selectedCodeCard].loop
    );
  }

  return (
    <>
      <BackVisuals />
      <main className="p-3">
        {!monaco && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-white text-5xl"
              spin={true}
            />
          </div>
        )}
        <div className="flex flex-row gap-10">
          <div
            className="relative mx-auto basis-1/2"
            style={{ visibility: monaco ? "visible" : "hidden" }}
          >
            <Editor
              height="80vh"
              width="auto"
              loading={false}
              defaultLanguage="javascript"
              theme=""
              options={{
                minimap: { enabled: false },
                overviewRulerBorder: false,
                wordWrap: "on",
                tabFocusMode: true,
              }}
              onChange={handleSetupCodeChange}
              value={{ ...codeCards[selectedCodeCard] }.setup}
            />
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
                wordWrap: "on",
              }}
              onChange={handleLoopCodeChange}
              value={codeCards[selectedCodeCard].loop}
            />
          </div>

          <div
            className="basis-1/6"
            style={{ visibility: monaco ? "visible" : "hidden" }}
          >
            <UploadPanel />
          </div>
        </div>
        <div className="flex pt-3 mt-4 gap-5">
          <OptionsBar />
          <div className="h-14 pe-3 border-s-2 border-white py-2"></div>
          {codeCards.map((card, index) => (
            <button
              key={index}
              className="text-2xl font-bold bg-zinc-400 w-9 rounded-lg 
            hover:bg-zinc-700 active:bg-transparent hover:text-white"
              style={{
                border: selectedCodeCard === index ? "5px double black" : null,
              }}
              onClick={() => setSelectedCodeCard(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
