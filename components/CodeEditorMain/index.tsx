"use client";

import CodeEditor from "@/components/CodeEditor";
import Navbar from "@/components/Navbar";
import { useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { OnMount } from "@monaco-editor/react";
import { runCode } from "./request";

const CodeEditorMain = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<"python" | "go" | "c" | "cpp">(
    "python"
  );

  const languages = {
    python: "py",
    go: "go",
    c: "c",
    cpp: "cpp",
  };

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorRef: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleClickForCode = async () => {
    try {
      if (editorRef.current) {
        const codeContent = editorRef.current.getValue();
        const newFile = new Blob([codeContent], { type: language });
        const formData = new FormData();
        formData.append("codeFile", newFile, `code.${languages[language]}`);
        if (!codeContent.trim()) {
          console.error("Code content cannot be empty");
          return;
        }

        const response = await runCode(formData);
        if (response.success) {
          console.log("Upload successful:", response.data);
        } else {
          console.error("Upload failed:", response.message);
        }

      } else {
        console.error("Editor is not initialized.");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
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
        {/* Input  */}
        <div className="w-[70%] h-full">
          <CodeEditor
            onMountFn={handleEditorRef}
            language={language}
            theme={theme}
          />
        </div>

        {/* OutPut  */}
        <div
          className={`w-[30%] h-full px-2 py-1 ${theme === "dark" ? "bg-[#1E1E1E]" : "bg-white"
            }`}
        >
          <div
            className={`text-sm font-mono ${theme === "dark" ? "text-white" : "text-gray-700"
              }`}
          >
            code output will show here :
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorMain;
