export type ThemeTypes = "light" | "dark";
export type SupportedLanguage = "python" | "go" | "c" | "cpp";

export interface CodeResponse {
  success: boolean;
  data: { output: string };
  message?: string;
}
