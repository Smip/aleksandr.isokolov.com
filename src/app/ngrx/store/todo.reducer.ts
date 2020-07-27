import {
  AddTodo,
  AddTodoFailure,
  AddTodoSuccess,
  ChangeVisibilityFilter,
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
import { VISIBILITY_FILTER } from '../filter/filter.model';
import { Action, createReducer, on } from '@ngrx/store';

export const todoFeatureKey = 'todo';

export interface TodosState {
  todos: ITodo[];
  filter: VISIBILITY_FILTER;
  loading: boolean;
  error: Error;
}

export const initialState: TodosState = {
  todos: [],
  filter: VISIBILITY_FILTER.SHOW_ALL,
  loading: true,
  error: null,
};


const _reducer = createReducer(initialState,
  on(LoadTodos),
  on(LoadTodosSuccess,
    (state, action) => ({
      ...state,
      todos: action.payload,
      loading: false,
    }),
  ),
  on(LoadTodosFailure,
    (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  ),

  on(DeleteTodo),
  on(DeleteTodoSuccess,
    (state, action) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== action.payload),
    }),
  ),
  on(DeleteTodoFailure,
    (state, action) => ({
      ...state,
      error: action.payload,
    }),
  ),
  on(AddTodo),
  on(AddTodoSuccess,
    (state, action) => ({
      ...state,
      todos: [...state.todos, action.payload],
    }),
  ),
  on(AddTodoFailure,
    (state, action) => ({
      ...state,
      error: action.payload,
    }),
  ),

  on(UpdateTodo),
  on(UpdateTodoSuccess,
    (state, action) => (
      {
        ...state,
        todos: state.todos.map(todo => todo.id === action.payload.id ? Object.assign({}, todo, action.payload) : todo),
      }
    ),
  ),
  on(UpdateTodoFailure,
    (state, action) => ({
      ...state,
      error: action.payload,
    }),
  ),
  on(ChangeVisibilityFilter,
    (state, action) => ({
      ...state,
      filter: action.payload,
    }),
  ),
);

export function reducer(state: TodosState | undefined, action: Action) {
  return _reducer(state, action);
}


