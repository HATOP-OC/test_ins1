export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TodosResponse {
  success: boolean;
  data: {
    todos: Todo[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface TodoResponse {
  success: boolean;
  data: Todo;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  status?: TodoStatus;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  status?: TodoStatus;
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code?: string;
  };
}
