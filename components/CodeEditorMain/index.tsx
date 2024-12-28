"use client";

import CodeEditor from "@/components/CodeEditor";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { OnMount } from "@monaco-editor/react";
import { runCode } from "./request";
import getDefaultCode from "./getDefaultCode";
import { CodeResponse, SupportedLanguage, ThemeTypes } from "./types";
import { languages } from "./constants";

const CodeEditorMain = () => {

  const [theme, setTheme] = useState<ThemeTypes>("dark");
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);


  const handleEditorRef: OnMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current) {
      const defaultCode = getDefaultCode(language);
      editorRef.current.setValue(defaultCode);
    }
  }, [language]);

  const handleClickForCode = async () => {
    if (!editorRef.current) {
      setError("Editor is not initialized.");
      return;
    }

    const codeContent = editorRef.current.getValue();

    if (!codeContent.trim()) {
      setError("Code content cannot be empty");
      return;
    }

    setError("");

    try {
      const codeFile = new Blob([codeContent], { type: language });
      const formData = new FormData();
      formData.append("codeFile", codeFile, `code.${languages[language]}`);

      const response = await runCode(formData) as CodeResponse;

      if (response.success) {
        setOutput(response.data.output || "No output provided.");
      } else {
        setError(response.message || "An unknown error occurred while running the code.");
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : "Unknown error occurred."}`);
    }
  };

  return (
    <div className="px-2 flex flex-col justify-center items-center bg-[#FFF0DC] h-screen">
      {/* Navbar */}
      <div className="w-full my-2">
        <Navbar
          runCode={handleClickForCode}
          theme={theme}
          changeLanguage={setLanguage}
          changeTheme={setTheme}
        />
      </div>

      <div className="w-full flex items-center flex-1 my-1 h-full gap-2">
        {/* Code Editor Section */}
        <div className="w-[70%] h-[90vh] overflow-y-auto">
          <CodeEditor
            onMountFn={handleEditorRef}
            language={language}
            onLanguageChange={setLanguage}
            theme={theme}
          />
        </div>

        {/* Output Section */}
        <div
          className={`w-[30%] h-full p-2 rounded ${theme === "dark" ? "bg-[#1E1E1E]" : "bg-white"
            }`}
        >
          {error ? (
            <div className="text-sm font-mono text-red-500">{error}</div>
          ) : (
            <div
              className={`text-sm font-mono ${theme === "dark" ? "text-white" : "text-gray-700"
                }`}
            >
              {output || "Code output will show here."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditorMain;
