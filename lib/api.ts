const isDev = process.env.NODE_ENV === "development";

const config = {
  baseURL: isDev ? "http://localhost:5000" : "",
};

export default config;
