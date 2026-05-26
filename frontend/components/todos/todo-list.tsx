'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import type { Todo, TodoStatus } from '@/lib/types';
import type { CreateTodoInput } from '@/lib/schemas';
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo, getTodoErrorMessage } from '@/hooks/use-todos';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TodoCard } from './todo-card';
import { TodoSheet } from './todo-sheet';
import { DeleteDialog } from './delete-dialog';
import { StatusFilter } from './status-filter';

export function TodoList() {
  const [statusFilter, setStatusFilter] = useState<TodoStatus | 'ALL'>('ALL');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const { data, isLoading, error } = useTodos(
    statusFilter !== 'ALL' ? { status: statusFilter } : undefined
  );
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleCreate = () => {
    setSelectedTodo(null);
    setSheetOpen(true);
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setSheetOpen(true);
  };

  const handleDeleteClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setDeleteOpen(true);
  };

  const handleSubmit = async (data: CreateTodoInput) => {
    if (selectedTodo) {
      await updateTodo.mutateAsync({ id: selectedTodo.id, payload: data });
    } else {
      await createTodo.mutateAsync(data);
    }
    setSheetOpen(false);
    setSelectedTodo(null);
  };

  const handleDelete = async () => {
    if (selectedTodo) {
      await deleteTodo.mutateAsync(selectedTodo.id);
      setDeleteOpen(false);
      setSelectedTodo(null);
    }
  };

  const todos = data?.data.todos || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Todo
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{getTodoErrorMessage(error)}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No todos found</p>
          <p className="text-muted-foreground">
            {statusFilter !== 'ALL' ? 'Try a different filter or ' : ''}
            Create your first todo to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onEdit={handleEdit} onDelete={handleDeleteClick} />
          ))}
        </div>
      )}

      <TodoSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        todo={selectedTodo}
        onSubmit={handleSubmit}
        isLoading={createTodo.isPending || updateTodo.isPending}
      />

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title={selectedTodo?.title || ''}
        isLoading={deleteTodo.isPending}
      />
    </div>
  );
}
