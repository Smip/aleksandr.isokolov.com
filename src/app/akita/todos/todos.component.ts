import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../state/todo.model';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit, OnChanges {
  @Input() todos: Todo[];
  @Output() complete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<ID>();

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index, todo) {
    return todo.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
