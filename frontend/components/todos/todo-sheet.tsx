'use client';

import type { Todo } from '@/lib/types';
import type { CreateTodoInput } from '@/lib/schemas';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TodoForm } from './todo-form';

interface TodoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo?: Todo | null;
  onSubmit: (data: CreateTodoInput) => void;
  isLoading?: boolean;
}

export function TodoSheet({ open, onOpenChange, todo, onSubmit, isLoading }: TodoSheetProps) {
  const isEditing = !!todo;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Edit Todo' : 'Create Todo'}</SheetTitle>
          <SheetDescription>
            {isEditing ? 'Update the details of your todo item.' : 'Add a new todo item to your list.'}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <TodoForm defaultValues={todo || undefined} onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
