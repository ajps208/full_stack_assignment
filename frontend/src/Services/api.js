import axios from "axios";

export const api = axios.create({
  baseURL: "https://full-stack-assignment-backend-l322.onrender.com/api/records",
});