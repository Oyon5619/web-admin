import axios from "axios";

export const baseRequest = axios.create({
  baseURL: import.meta.env.DEV ? "" : "http://localhost:3035/api",
  timeout: 5000,
});
