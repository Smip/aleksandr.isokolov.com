import { guid } from '@datorama/akita';

export interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
}

export function createTodo(title: string) {
  return {
    id: guid(),
    title,
    completed: false
  } as Todo;
}
