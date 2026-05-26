import { z } from 'zod';
import { TodoStatus } from '@prisma/client';

export const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, 'Title cannot be empty')
      .max(255, 'Title must be less than 255 characters')
      .trim(),
    description: z
      .string()
      .max(1000, 'Description must be less than 1000 characters')
      .trim()
      .optional(),
    status: z.nativeEnum(TodoStatus).optional(),
  }),
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid todo ID format'),
  }),
  body: z.object({
    title: z
      .string()
      .min(1, 'Title cannot be empty')
      .max(255, 'Title must be less than 255 characters')
      .trim()
      .optional(),
    description: z
      .string()
      .max(1000, 'Description must be less than 1000 characters')
      .trim()
      .nullable()
      .optional(),
    status: z.nativeEnum(TodoStatus).optional(),
  }),
});

export const todoIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid todo ID format'),
  }),
});

export const listTodosSchema = z.object({
  query: z.object({
    status: z.nativeEnum(TodoStatus).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
  }),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>['body'];
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>['body'];
export type ListTodosQuery = z.infer<typeof listTodosSchema>['query'];
