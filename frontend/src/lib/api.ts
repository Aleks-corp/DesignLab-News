import { IArticles } from "@/types/article.type";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers["x-admin-token"] = token; // <-- правильний заголовок
    }
  }
  return config;
});

export default api;

// --- Запити ---

export const fetchArticles = async (
  page: number = 1,
  limit: number = 9,
  search?: string
) => {
  const response = await api.get(`/articles/published`, {
    params: { page, limit, search },
  });
  return response.data;
};

export const fetchArticleById = async (id: string) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};

export const login = async (data: { password: string }) => {
  const response = await api.post(`/auth/login`, data);
  return response.data;
};
export const current = async () => {
  return await api.get("/auth/current");
};

export const fetchArticlesToReview = async () => {
  const response = await api.get(`/articles/pending`);
  return response.data;
};

export const confirmArticle = async (article: IArticles) => {
  const response = await api.patch(`/articles/confirm`, article);
  return response.data;
};

export const deleteArticle = async (id: string) => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};
