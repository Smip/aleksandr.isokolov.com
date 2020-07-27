import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from './models/Todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { AddTodo, ChangeVisibilityFilter, DeleteTodo, LoadTodos, UpdateTodo } from './store/todo.actions';
import { initialFilters, VISIBILITY_FILTER } from './filter/filter.model';
import { selectFilteredTodos, selectTodosFilter } from './store/todo.selectors';
import { guid } from '@datorama/akita';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.scss']
})
export class NgrxComponent implements OnInit {
  title: string;
  filters = initialFilters;

  todos$: Observable<ITodo[]> = this.store.select(selectFilteredTodos);
  isLoading$: Observable<boolean> = this.store.select(store => store.todos.loading);
  activeFilter$: Observable<VISIBILITY_FILTER> = this.store.select(selectTodosFilter);

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.store.dispatch(LoadTodos());
  }

  addTodo(title: string = 'New todo') {
    this.store.dispatch(AddTodo({payload: {
      id: guid(),
      title,
      completed: false
    }}));
    this.title = undefined;
  }

  deleteTodo(id: number) {
    this.store.dispatch(DeleteTodo({payload: id}));
  }

  completeTodo(todo: ITodo) {
    this.store.dispatch(UpdateTodo({payload: todo}));
  }

  changeFilter(filter: VISIBILITY_FILTER) {
    this.store.dispatch(ChangeVisibilityFilter({payload: filter}));
  }
}
