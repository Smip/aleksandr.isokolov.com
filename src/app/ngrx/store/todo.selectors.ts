import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTodo from './todo.reducer';
import { AppState } from '../../store/reducers';
import { VISIBILITY_FILTER } from '../../akita/filter/filter.model';

export const selectTodoState = createFeatureSelector<fromTodo.TodosState>(
  fromTodo.todoFeatureKey
);

export const selectTodos = createSelector(
  (state: AppState) => state.todos,
  todosState => todosState.todos
);

export const selectTodosFilter = createSelector(
  (state: AppState) => state.todos,
  todosState => todosState.filter
);

export const selectFilteredTodos = createSelector(
  selectTodosFilter,
  selectTodos,
  (filter, todos) => {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      case VISIBILITY_FILTER.SHOW_ACTIVE:
        return todos.filter(t => !t.completed);
      default:
        return todos;
    }
  }
);
