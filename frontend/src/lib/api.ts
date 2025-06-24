import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Запити ---

export const fetchArticles = async (page: number = 1, limit: number = 9) => {
  const response = await api.get(`/articles`, {
    params: { page, limit },
  });
  return response.data;
};

export const fetchArticleById = async (id: string) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};

export const login = async (data: { username: string; password: string }) => {
  const response = await api.post(`/auth/login`, data);
  return response.data;
};
