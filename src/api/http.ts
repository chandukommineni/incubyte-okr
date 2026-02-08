import axios, { type AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const res = await api.request<T>(config);
  return res.data;
}
