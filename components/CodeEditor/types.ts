import { OnMount } from "@monaco-editor/react";
import { Dispatch, SetStateAction } from "react";

export interface CodeEditorProps {
  theme?: string;
  language?: string;
  onLanguageChange: Dispatch<SetStateAction<"python" | "go" | "c" | "cpp">>;
  onMountFn: OnMount;
}
