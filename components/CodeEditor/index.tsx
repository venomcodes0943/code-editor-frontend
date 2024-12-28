"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import Loader from "../Loader";
import getDefaultCode from "../CodeEditorMain/getDefaultCode";
import { Dispatch, SetStateAction } from "react";

interface CodeEditorProps {
  theme?: string;
  language?: string;
  onLanguageChange: Dispatch<SetStateAction<"python" | "go" | "c" | "cpp">>;
  onMountFn: OnMount;
}



const CodeEditor = ({
  theme = "light",
  language = "python",
  onMountFn,
}: CodeEditorProps) => {

  return (
    <>
      <Editor
        defaultLanguage={language}
        defaultValue={getDefaultCode(language)}
        theme={`vs-${theme}`}
        language={language}
        onMount={onMountFn}
        loading={<Loader />}
        options={{
          fontSize: 14,
          cursorBlinking: "smooth",
          padding: {
            top: 5,
            bottom: 5,
          },
          cursorSurroundingLinesStyle: "all",
        }}
      />
    </>
  );
};

export default CodeEditor;
