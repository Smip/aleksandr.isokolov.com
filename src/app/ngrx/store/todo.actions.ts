import { createAction, props } from '@ngrx/store';
import { ITodo } from '../models/Todo.model';
import { VISIBILITY_FILTER } from '../filter/filter.model';

export const LoadTodos = createAction(
  '[Todos] Load Todos'
);

export const LoadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{payload: ITodo[]}>()
);

export const LoadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{payload: Error}>()
);

export const DeleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{payload: number}>()
);

export const DeleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{payload: number}>()
);

export const DeleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{payload: Error}>()
);

export const AddTodo = createAction(
  '[Todo] Add Todo',
  props<{payload: ITodo}>()
);

export const AddTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{payload: ITodo}>()
);

export const AddTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{payload: Error}>()
);

export const UpdateTodo = createAction(
  '[Todo] Update Todo',
  props<{payload: ITodo}>()
);

export const UpdateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{payload: ITodo}>()
);

export const UpdateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{payload: Error}>()
);

export const ChangeVisibilityFilter = createAction(
  '[Todos Visibility Filter] Change Visibility Filter',
  props<{payload: VISIBILITY_FILTER}>()
);
