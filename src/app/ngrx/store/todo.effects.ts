import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, delay, map, mapTo, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddTodo,
  AddTodoFailure,
  AddTodoSuccess,
  DeleteTodo,
  DeleteTodoFailure,
  DeleteTodoSuccess,
  LoadTodos,
  LoadTodosFailure,
  LoadTodosSuccess,
  UpdateTodo,
  UpdateTodoFailure,
  UpdateTodoSuccess,
} from './todo.actions';
import { ITodo } from '../models/Todo.model';
import { selectTodos } from './todo.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';

const request = of(1)
  .pipe(
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
    ] as ITodo[]),
  );


@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(LoadTodos),
    withLatestFrom(
      this.store.select(selectTodos),
    ),
    switchMap(([action, todos]) => {
      if (todos.length > 0) {
        return of({ type: LoadTodosSuccess.type, payload: todos });
      }
      return request.pipe(
        map(data => ({ type: LoadTodosSuccess.type, payload: data })),
        catchError(error => (of({ type: LoadTodosFailure.type, payload: error }))),
      );
    }),
  ));

  deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteTodo),
    concatMap((action) =>
      of(1).pipe(
        delay(500),
        map(() => ({ type: DeleteTodoSuccess.type, payload: action.payload })),
        catchError(error => of({ type: DeleteTodoFailure.type, payload: error })),
      ),
    ),
  ));

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(AddTodo),
    concatMap((action) =>
      of(1).pipe(
        delay(500),
        map(() => ({ type: AddTodoSuccess.type, payload: action.payload })),
        catchError(error => of({ type: AddTodoFailure.type, payload: error })),
      ),
    ),
  ));

  updateTodo$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateTodo),
    concatMap((action) =>
      of(1).pipe(
        delay(500),
        map(() => ({ type: UpdateTodoSuccess.type, payload: action.payload })),
        catchError(error => of({ type: UpdateTodoFailure.type, payload: error })),
      ),
    ),
  ));

  constructor(private actions$: Actions, private store: Store<AppState>) {
  }

}
