'use client';

import { Pencil, Trash2 } from 'lucide-react';
import type { Todo } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

const statusColors: Record<string, string> = {
  TODO: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  DONE: 'bg-green-500/10 text-green-600 dark:text-green-400',
};

export function TodoCard({ todo, onEdit, onDelete }: TodoCardProps) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold leading-tight">{todo.title}</h3>
          {todo.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{todo.description}</p>
          )}
        </div>
        <div className="flex gap-2 opacity-100">
          <Button variant="ghost" size="sm" onClick={() => onEdit(todo)} aria-label="Edit todo">
            <Pencil className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(todo)} aria-label="Delete todo">
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="text-destructive">Delete</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className={statusColors[todo.status]}>
          {todo.status.replace('_', ' ')}
        </Badge>
      </CardContent>
    </Card>
  );
}
