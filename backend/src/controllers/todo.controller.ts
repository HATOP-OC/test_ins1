import { Response, NextFunction } from 'express';
import * as todoService from '../services/todo.service';
import { AuthenticatedRequest, ApiResponse, TodoResponse } from '../types';
import { ListTodosQuery } from '../validations/todo.validation';

export const createTodo = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<TodoResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const todo = await todoService.createTodo(req.user!.userId, req.body);
    res.status(201).json({
      success: true,
      data: todo,
      message: 'Todo created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<{ todos: TodoResponse[]; total: number; page: number; limit: number }>>,
  next: NextFunction
): Promise<void> => {
  try {
    const query = (res.locals.validated?.query ?? req.query) as ListTodosQuery;
    const result = await todoService.getTodos(req.user!.userId, query);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<TodoResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const todoId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const todo = await todoService.getTodoById(req.user!.userId, todoId);
    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse<TodoResponse>>,
  next: NextFunction
): Promise<void> => {
  try {
    const todoId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const todo = await todoService.updateTodo(
      req.user!.userId,
      todoId,
      req.body
    );
    res.json({
      success: true,
      data: todo,
      message: 'Todo updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: AuthenticatedRequest,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const todoId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await todoService.deleteTodo(req.user!.userId, todoId);
    res.json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
