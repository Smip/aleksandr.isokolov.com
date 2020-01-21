import { Injectable } from '@angular/core';
import { cacheable, ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TodosStore } from './todos.store';
import { createTodo, Todo } from './todo.model';
import { delay, mapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodosQuery } from './todos.query';
import { VISIBILITY_FILTER } from '../filter/filter.model';

@Injectable({ providedIn: 'root' })
export class TodosService {

  constructor(
    private todosStore: TodosStore,
    private todosQuery: TodosQuery,
    private http: HttpClient,
  ) {
  }

  get() {
    const request = of(1)
      .pipe(
        tap(() => {
          this.todosStore.setLoading(true);
        }),
        delay(1000),
        mapTo([
          {
            id: 1,
            title: 'Hello world',
            completed: false,
          },
          {
            id: 2,
            title: 'Hello world 2',
            completed: true,
          },
          {
            id: 3,
            title: 'Hello world 3',
            completed: false,
          },
        ] as Todo[]),
        tap(entities => {
          this.todosStore.set(entities);
        }),
      );
    return cacheable(this.todosStore, request);
  }

  updateFilter(filter: VISIBILITY_FILTER) {
    this.todosStore.update({
      ui: {
        filter,
      },
    });
  }

  add(title: string) {
    const todo = createTodo(title);
    this.todosStore.add(todo);
  }

  update(id, todo: Partial<Todo>) {
    this.todosStore.update(id, todo);
  }

  remove(id: ID) {
    this.todosStore.remove(id);
  }
}
