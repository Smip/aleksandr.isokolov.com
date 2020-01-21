import { Component, OnInit } from '@angular/core';
import { TodosQuery } from './state/todos.query';
import { TodosService } from './state/todos.service';
import { Observable } from 'rxjs';
import { Todo } from './state/todo.model';
import { updateTextFields } from '@smip/ngx-materialize';
import { initialFilters, VISIBILITY_FILTER } from './filter/filter.model';

@Component({
  selector: 'app-akita',
  templateUrl: './akita.component.html',
  styleUrls: ['./akita.component.scss']
})
export class AkitaComponent implements OnInit {
  todos$: Observable<Todo[]>;
  selectLoading$: Observable<boolean>;
  title: string;
  filters = initialFilters;
  activeFilter$: Observable<VISIBILITY_FILTER>;

  constructor(
    private todosQuery: TodosQuery,
    private todosService: TodosService
  ) { }

  ngOnInit() {
    this.todos$ = this.todosQuery.selectVisibleTodos$;
    this.activeFilter$ = this.todosQuery.selectVisibilityFilter$;
    this.selectLoading$ = this.todosQuery.selectLoading();
    this.getTodos();
  }

  getTodos() {
    this.todosService.get().subscribe();
  }

  addTodo(title = 'New todo') {
    this.todosService.add(title);
    this.title = undefined;
    updateTextFields();
  }

  deleteTodo(id) {
    this.todosService.remove(id);
  }

  completeTodo(todo: Todo) {
    this.todosService.update(todo.id, {completed: todo.completed});
  }

  changeFilter(filter: VISIBILITY_FILTER) {
    this.todosService.updateFilter(filter);
  }
}
