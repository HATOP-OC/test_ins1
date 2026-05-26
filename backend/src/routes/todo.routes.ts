import { Router } from 'express';
import * as todoController from '../controllers/todo.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import {
  createTodoSchema,
  updateTodoSchema,
  todoIdSchema,
  listTodosSchema,
} from '../validations/todo.validation';

const router = Router();

router.use(authenticate);

router.post('/', validate(createTodoSchema), todoController.createTodo);

router.get('/', validate(listTodosSchema), todoController.getTodos);

router.get('/:id', validate(todoIdSchema), todoController.getTodoById);

router.patch('/:id', validate(updateTodoSchema), todoController.updateTodo);

router.delete('/:id', validate(todoIdSchema), todoController.deleteTodo);

export default router;
