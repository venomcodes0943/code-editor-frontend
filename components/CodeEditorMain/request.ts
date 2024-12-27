import instance from "@/lib/instance";

interface RunCodeResponse {
  success: boolean;
  data?: string;
  message?: string;
}

export const runCode = async (file: FormData): Promise<RunCodeResponse> => {
  try {
    const response = await instance.post("/code/upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      data: response.data,
      message: "File uploaded successfully!",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Extract and log detailed error information
    console.error("Error uploading file:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while uploading the file.",
    };
  }
};
