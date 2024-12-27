import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface NavbarProps {
  theme: string;
  runCode: () => void;
  changeTheme: Dispatch<SetStateAction<"light" | "dark">>;
  changeLanguage: Dispatch<SetStateAction<"python" | "go" | "c" | "cpp">>;
}

const Navbar = ({
  theme,
  runCode,
  changeTheme,
  changeLanguage,
}: NavbarProps) => {
  return (
    <div
      className={`${theme === "dark" ? "bg-[#1E1E1E] text-white" : ""
        } rounded-md border shadow-lg py-1 px-8 flex justify-between items-center`}
    >
      <div className="text-2xl font-bold">Navbar</div>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 outline-none border-b-2 py-1">
            Theme
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => changeTheme("light")}
              className="text-sm cursor-pointer"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeTheme("dark")}
              className="text-sm cursor-pointer"
            >
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 outline-none border-b-2 py-1">
            Languages
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => changeLanguage("python")}
              className="text-sm cursor-pointer"
            >
              Python
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage("go")}
              className="text-sm cursor-pointer"
            >
              Go
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage("c")}
              className="text-sm cursor-pointer"
            >
              C
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => changeLanguage("cpp")}
              className="text-sm cursor-pointer"
            >
              C++
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={runCode}
          className={`${theme === "dark" ? "bg-slate-100 text-black hover:bg-white" : ""
            } px-4 outline-none border-b-2 py-1`}
        >
          Run Code
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
