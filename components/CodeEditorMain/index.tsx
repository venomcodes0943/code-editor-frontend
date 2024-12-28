"use client";

import CodeEditor from "@/components/CodeEditor";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { OnMount } from "@monaco-editor/react";
import { runCode } from "./request";
import getDefaultCode from "./getDefaultCode";

type ThemeTypes = "light" | "dark";
type SupportedLanguage = "python" | "go" | "c" | "cpp";
interface CodeResponse {
  success: boolean;
  data: {
    output: string;
  };
  message?: string;
}

const CodeEditorMain = () => {
  const [theme, setTheme] = useState<ThemeTypes>("dark");
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>('')

  const languages = {
    python: "py",
    go: "go",
    c: "c",
    cpp: "cpp",
  } as const;

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorRef: OnMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (editorRef.current) {
      const defaultCode = getDefaultCode(language);
      editorRef.current.setValue(defaultCode);
    }
  }, [language])


  const handleClickForCode = async () => {
    try {
      if (editorRef.current) {
        const codeContent = editorRef.current.getValue();

        if (!codeContent.trim()) {
          setError("Code content cannot be empty");
          return;
        }
        setError('');

        const newFile = new Blob([codeContent], { type: language });
        const formData = new FormData();
        formData.append("codeFile", newFile, `code.${languages[language]}`);

        const response = await runCode(formData) as CodeResponse;

        if (response.success) {
          setCode(response.data.output || "");
          console.log("Upload successful:", response.data.output);
        } else {
          console.error("Upload failed:", response.message);
          setError(`Error: ${response.message || "Unknown error occurred"}`);
        }
      } else {
        console.error("Editor is not initialized.");
        setCode("Error: Editor is not initialized");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
      setCode(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
    }
  };

  return (
    <div className="px-2 flex flex-col justify-center items-center bg-[#FFF0DC] h-screen">
      <div className="w-full my-2">
        <Navbar
          runCode={handleClickForCode}
          theme={theme}
          changeLanguage={setLanguage}
          changeTheme={setTheme}
        />
      </div>
      <div className="w-full flex items-center flex-1 my-1 h-full gap-2">
        {/* Input */}
        <div className="w-[70%] h-[90vh] overflow-y-auto">
          <CodeEditor
            onMountFn={handleEditorRef}
            language={language}
            onLanguageChange={setLanguage}
            theme={theme}
          />
        </div>

        {/* Output */}
        <div
          className={`w-[30%] h-full p-2 rounded ${theme === "dark" ? "bg-[#1E1E1E]" : "bg-white"
            }`}
        >
          {error === '' ? <div
            className={`text-sm font-mono ${theme === "dark" ? "text-white" : "text-gray-700"
              }`}
          >
            {code || ' Code output will show here'}
          </div> : null}

          {error && <div
            className={`text-sm font-mono text-red-500`}
          >
            {error}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default CodeEditorMain;