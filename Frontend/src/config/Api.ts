import axios from "axios";

const host = process.env.REACT_APP_API_URL || "http://localhost:5454";

export const api = axios.create({
  baseURL: host,
  headers: {
    "Content-Type": "application/json",
  },
});