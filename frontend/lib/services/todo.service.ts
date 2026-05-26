import apiClient from '../api-client';
import type { TodosResponse, TodoResponse, CreateTodoInput, UpdateTodoInput, TodoStatus } from '../types';

export interface GetTodosParams {
  page?: number;
  limit?: number;
  status?: TodoStatus;
  search?: string;
}

export const todoService = {
  getAll: async (params?: GetTodosParams): Promise<TodosResponse> => {
    const { data } = await apiClient.get<TodosResponse>('/todos', { params });
    return data;
  },

  getById: async (id: string): Promise<TodoResponse> => {
    const { data } = await apiClient.get<TodoResponse>(`/todos/${id}`);
    return data;
  },

  create: async (payload: CreateTodoInput): Promise<TodoResponse> => {
    const { data } = await apiClient.post<TodoResponse>('/todos', payload);
    return data;
  },

  update: async (id: string, payload: UpdateTodoInput): Promise<TodoResponse> => {
    const { data } = await apiClient.patch<TodoResponse>(`/todos/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<{ success: boolean; data: { message: string } }> => {
    const { data } = await apiClient.delete(`/todos/${id}`);
    return data;
  },
};
