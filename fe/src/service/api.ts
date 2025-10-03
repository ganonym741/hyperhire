import axios from "axios";
import { Menu, CreateMenuDto, UpdateMenuDto } from "@/types/menu";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const menuApi = {
  getTree: async (): Promise<Menu[]> => {
    const response = await api.get<{ data: Menu[] }>("/menu?depth=4");
    return response.data.data;
  },

  getById: async (id: string): Promise<Menu> => {
    const response = await api.get<Menu>(`/menu/${id}`);
    return response.data;
  },

  create: async (data: CreateMenuDto): Promise<Menu> => {
    const response = await api.post<Menu>("/menu", data);
    return response.data;
  },

  update: async (id: string, data: UpdateMenuDto): Promise<Menu> => {
    const response = await api.put<Menu>(`/menu/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/menu/${id}`);
  },
};

export default api;
