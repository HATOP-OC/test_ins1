'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { TodoStatus } from '@/lib/types';

interface StatusFilterProps {
  value: TodoStatus | 'ALL';
  onChange: (value: TodoStatus | 'ALL') => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as TodoStatus | 'ALL')}>
      <TabsList>
        <TabsTrigger value="ALL">All</TabsTrigger>
        <TabsTrigger value="TODO">Todo</TabsTrigger>
        <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
        <TabsTrigger value="DONE">Done</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
