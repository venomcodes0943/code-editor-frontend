"use client";

import Editor from "@monaco-editor/react";
import Loader from "../Loader";
import getDefaultCode from "../CodeEditorMain/getDefaultCode";
import { CodeEditorProps } from "./types";

const CodeEditor = ({
  theme = "light",
  language = "python",
  onMountFn,
}: CodeEditorProps) => {

  return (
    <>
      <Editor
        className="rounded-md"
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
