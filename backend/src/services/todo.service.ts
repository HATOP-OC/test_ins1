import { prisma } from '../config/database';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import { CreateTodoInput, UpdateTodoInput, ListTodosQuery } from '../validations/todo.validation';
import { TodoResponse } from '../types';

export const createTodo = async (
  userId: string,
  input: CreateTodoInput
): Promise<TodoResponse> => {
  const todo = await prisma.todo.create({
    data: {
      title: input.title,
      description: input.description,
      status: input.status,
      userId,
    },
  });

  return todo;
};

export const getTodos = async (
  userId: string,
  query: ListTodosQuery
): Promise<{ todos: TodoResponse[]; total: number; page: number; limit: number }> => {
  const { status, page, limit } = query;
  const skip = (page - 1) * limit;

  const where = {
    userId,
    ...(status && { status }),
  };

  const [todos, total] = await Promise.all([
    prisma.todo.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.todo.count({ where }),
  ]);

  return { todos, total, page, limit };
};

export const getTodoById = async (
  userId: string,
  todoId: string
): Promise<TodoResponse> => {
  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!todo) {
    throw new NotFoundError('Todo not found');
  }

  if (todo.userId !== userId) {
    throw new ForbiddenError('Access denied');
  }

  return todo;
};

export const updateTodo = async (
  userId: string,
  todoId: string,
  input: UpdateTodoInput
): Promise<TodoResponse> => {
  const existingTodo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  if (existingTodo.userId !== userId) {
    throw new ForbiddenError('Access denied');
  }

  const todo = await prisma.todo.update({
    where: { id: todoId },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.status !== undefined && { status: input.status }),
    },
  });

  return todo;
};

export const deleteTodo = async (userId: string, todoId: string): Promise<void> => {
  const existingTodo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!existingTodo) {
    throw new NotFoundError('Todo not found');
  }

  if (existingTodo.userId !== userId) {
    throw new ForbiddenError('Access denied');
  }

  await prisma.todo.delete({
    where: { id: todoId },
  });
};
