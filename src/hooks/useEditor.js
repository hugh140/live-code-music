import { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

function useEditor() {
  const monaco = useMonaco();

  useEffect(() => {
    monaco?.editor.defineTheme("default", {
      base: "vs-dark",
      inherit: false,
      rules: [
        { token: "", foreground: "EAEAEA", background: "1E1E1E" },
        { token: "invalid", foreground: "FF5D5D" },
        { token: "emphasis", fontStyle: "italic" },
        { token: "strong", fontStyle: "bold" },

        { token: "variable", foreground: "4B4E6D" },
        { token: "variable.predefined", foreground: "4B4E6D" },
        { token: "variable.parameter", foreground: "4B4E6D" },
        { token: "constant", foreground: "4B4E6D" },
        { token: "comment", foreground: "9FCC2E" },
        { token: "number", foreground: "A1C6EA" },
        { token: "number.hex", foreground: "A1C6EA" },
        { token: "regexp", foreground: "B46695" },
        { token: "annotation", foreground: "000000" },
        { token: "type", foreground: "3DC9B0" },

        { token: "key", foreground: "9FCC2E" },
        { token: "string.key.json", foreground: "9FCC2E" },
        { token: "string.value.json", foreground: "9FCC2E" },

        { token: "attribute.name", foreground: "9CDCFE" },
        { token: "attribute.value", foreground: "CE9178" },
        { token: "attribute.value.number.css", foreground: "B5CEA8" },
        { token: "attribute.value.unit.css", foreground: "B5CEA8" },
        { token: "attribute.value.hex.css", foreground: "D4D4D4" },

        { token: "string", foreground: "80A1D4" },
        { token: "string.sql", foreground: "80A1D4" },

        { token: "keyword", foreground: "64A9F7" },
        { token: "keyword.flow", foreground: "64A9F7" },
        { token: "keyword.json", foreground: "64A9F7" },
        { token: "keyword.flow.scss", foreground: "64A9F7" },

        { token: "operator.scss", foreground: "9FCC2E" },
        { token: "operator.sql", foreground: "9FCC2E" },
        { token: "operator.swift", foreground: "9FCC2E" },
        { token: "predefined.sql", foreground: "9FCC2E" },
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
    }
  }, [monaco]);
}

export default useEditor;
