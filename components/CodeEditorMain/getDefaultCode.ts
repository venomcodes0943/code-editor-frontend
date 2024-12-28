const getDefaultCode = (lang: string): string => {
  switch (lang) {
    case "python":
      return 'print("Hello, World!")';

    case "go":
      return `package main
    
    import "fmt"
    
    func main() {
        fmt.Println("Hello, World!")
    }`;

    case "c":
      return `#include <stdio.h>
    
    int main() {
        printf("Hello, World!\\n");
        return 0;
    }`;

    case "cpp":
      return `#include <iostream>
    
    int main() {
        std::cout << "Hello, World!" << std::endl;
        return 0;
    }`;

    default:
      return "# Start coding here!";
  }
};

export default getDefaultCode;
