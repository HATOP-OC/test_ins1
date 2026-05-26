'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoService, GetTodosParams } from '@/lib/services/todo.service';
import type { CreateTodoInput, UpdateTodoInput } from '@/lib/types';
import { AxiosError } from 'axios';

export function useTodos(params?: GetTodosParams) {
  return useQuery({
    queryKey: ['todos', params],
    queryFn: () => todoService.getAll(params),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useTodo(id: string) {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => todoService.getById(id),
    enabled: !!id,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTodoInput) => todoService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTodoInput }) =>
      todoService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', variables.id] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function getTodoErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as
      | { message?: string; errors?: Record<string, string[]> }
      | undefined;
    if (responseData?.message) {
      if (responseData.errors) {
        const firstField = Object.keys(responseData.errors)[0];
        const firstError = firstField ? responseData.errors[firstField]?.[0] : undefined;
        return firstError ? `${responseData.message}: ${firstError}` : responseData.message;
      }
      return responseData.message;
    }
    return error.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
}
