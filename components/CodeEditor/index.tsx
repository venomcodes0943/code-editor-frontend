"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import Loader from "../Loader";

interface CodeEditorProps {
  theme?: string;
  language?: string;
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
        defaultValue="# Start coding here!"
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
